import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

/**
 * Webhook endpoint para receber dados do ReplyAgent
 * 
 * Este endpoint permite que o ReplyAgent envie dados diretamente para o sistema
 * sem necessidade de intermediários como Make.com
 * 
 * Casos de uso:
 * 1. Criar venda via WhatsApp/Instagram
 * 2. Atualizar estoque
 * 3. Criar/atualizar contatos
 * 4. Registrar transações financeiras
 */

// Schema para criação de venda via webhook
const webhookSaleSchema = z.object({
  action: z.literal('create_sale'),
  data: z.object({
    customer_name: z.string(),
    customer_phone: z.string(),
    customer_email: z.string().optional(),
    items: z.array(z.object({
      product_sku: z.string().optional(),
      product_name: z.string(),
      quantity: z.number(),
      unit_price: z.number(),
    })),
    payment_method: z.enum(['pix', 'credit_card', 'debit_card', 'cash', 'other']),
    notes: z.string().optional(),
    source: z.string().optional(), // 'whatsapp', 'instagram', 'facebook', etc
  }),
})

// Schema para atualização de estoque via webhook
const webhookStockSchema = z.object({
  action: z.literal('update_stock'),
  data: z.object({
    product_sku: z.string(),
    quantity: z.number(),
    type: z.enum(['in', 'out']),
    reason: z.string().optional(),
  }),
})

// Schema para criação de contato via webhook
const webhookContactSchema = z.object({
  action: z.literal('create_contact'),
  data: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().optional(),
    type: z.enum(['customer', 'supplier', 'other']).default('customer'),
    notes: z.string().optional(),
    source: z.string().optional(),
  }),
})

const webhookSchema = z.union([
  webhookSaleSchema,
  webhookStockSchema,
  webhookContactSchema,
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = webhookSchema.parse(body)

    // Processar baseado na ação
    switch (validated.action) {
      case 'create_sale':
        return await handleCreateSale(validated.data)
      
      case 'update_stock':
        return await handleUpdateStock(validated.data)
      
      case 'create_contact':
        return await handleCreateContact(validated.data)
      
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Handler para criar venda
async function handleCreateSale(data: any) {
  try {
    // 1. Buscar ou criar contato
    let contact = null
    const { data: existingContact } = await supabaseAdmin
      .from('contacts')
      .select('id')
      .eq('phone', data.customer_phone)
      .single()

    if (existingContact) {
      contact = existingContact
    } else {
      const { data: newContact, error: contactError } = await supabaseAdmin
        .from('contacts')
        .insert([{
          name: data.customer_name,
          phone: data.customer_phone,
          email: data.customer_email,
          type: 'customer',
          notes: data.source ? `Origem: ${data.source}` : undefined,
        }])
        .select('id')
        .single()

      if (contactError) throw contactError
      contact = newContact
    }

    // 2. Buscar produtos e calcular total
    const items = []
    let totalAmount = 0

    for (const item of data.items) {
      let product = null

      if (item.product_sku) {
        const { data: productData } = await supabaseAdmin
          .from('products')
          .select('id, name, sell_price')
          .eq('sku', item.product_sku)
          .single()
        
        product = productData
      } else {
        // Buscar por nome
        const { data: productData } = await supabaseAdmin
          .from('products')
          .select('id, name, sell_price')
          .ilike('name', `%${item.product_name}%`)
          .single()
        
        product = productData
      }

      if (!product) {
        throw new Error(`Product not found: ${item.product_sku || item.product_name}`)
      }

      const itemTotal = item.quantity * item.unit_price
      totalAmount += itemTotal

      items.push({
        product_id: product.id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: itemTotal,
      })
    }

    // 3. Gerar número da venda
    const { data: lastSale } = await supabaseAdmin
      .from('sales')
      .select('sale_number')
      .order('sale_number', { ascending: false })
      .limit(1)
      .single()

    const saleNumber = lastSale ? lastSale.sale_number + 1 : 1

    // 4. Criar venda
    const { data: sale, error: saleError } = await supabaseAdmin
      .from('sales')
      .insert([{
        sale_number: saleNumber,
        contact_id: contact.id,
        total_amount: totalAmount,
        payment_method: data.payment_method,
        status: 'pending',
        notes: data.notes,
      }])
      .select()
      .single()

    if (saleError) throw saleError

    // 5. Criar itens da venda
    const itemsToInsert = items.map(item => ({
      sale_id: sale.id,
      ...item,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('sale_items')
      .insert(itemsToInsert)

    if (itemsError) throw itemsError

    // 6. Retornar venda completa
    const { data: completeSale } = await supabaseAdmin
      .from('sales')
      .select(`
        *,
        contact:contacts(name, phone, email),
        items:sale_items(
          *,
          product:products(name, sku)
        )
      `)
      .eq('id', sale.id)
      .single()

    return NextResponse.json({
      success: true,
      message: 'Sale created successfully',
      data: completeSale,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Handler para atualizar estoque
async function handleUpdateStock(data: any) {
  try {
    // Buscar produto
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('id, stock')
      .eq('sku', data.product_sku)
      .single()

    if (!product) {
      throw new Error(`Product not found: ${data.product_sku}`)
    }

    // Calcular novo estoque
    const newStock = data.type === 'in' 
      ? product.stock + data.quantity 
      : product.stock - data.quantity

    // Atualizar estoque
    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update({ stock: newStock })
      .eq('id', product.id)

    if (updateError) throw updateError

    // Criar movimentação de estoque
    const { data: movement, error: movementError } = await supabaseAdmin
      .from('stock_movements')
      .insert([{
        product_id: product.id,
        type: data.type,
        quantity: data.quantity,
        reason: data.reason || 'Webhook update',
      }])
      .select()
      .single()

    if (movementError) throw movementError

    return NextResponse.json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        product_id: product.id,
        old_stock: product.stock,
        new_stock: newStock,
        movement,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Handler para criar contato
async function handleCreateContact(data: any) {
  try {
    // Verificar se já existe
    const { data: existing } = await supabaseAdmin
      .from('contacts')
      .select('id')
      .eq('phone', data.phone)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Contact already exists',
        data: existing,
      })
    }

    // Criar novo contato
    const { data: contact, error } = await supabaseAdmin
      .from('contacts')
      .insert([{
        name: data.name,
        phone: data.phone,
        email: data.email,
        type: data.type,
        notes: data.notes || (data.source ? `Origem: ${data.source}` : undefined),
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Contact created successfully',
      data: contact,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

