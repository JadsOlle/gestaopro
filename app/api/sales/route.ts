import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

// GET /api/sales - Listar vendas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50

    const { data, error } = await supabaseAdmin
      .from('sales')
      .select(`
        *,
        contact:contacts(name, phone, email),
        items:sale_items(
          *,
          product:products(name, sku)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/sales - Criar venda
const createSaleSchema = z.object({
  contact_id: z.string().uuid().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  total_amount: z.number(),
  payment_method: z.enum(['pix', 'credit_card', 'debit_card', 'cash', 'other']),
  status: z.enum(['pending', 'paid', 'cancelled']).default('pending'),
  notes: z.string().optional(),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number(),
    unit_price: z.number(),
    total_price: z.number(),
  })),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createSaleSchema.parse(body)

    // Se tiver contact_name mas não contact_id, criar/buscar contato
    let contactId = validated.contact_id
    if (!contactId && validated.contact_name) {
      const { data: existingContact } = await supabaseAdmin
        .from('contacts')
        .select('id')
        .eq('phone', validated.contact_phone || '')
        .single()

      if (existingContact) {
        contactId = existingContact.id
      } else {
        const { data: newContact, error: contactError } = await supabaseAdmin
          .from('contacts')
          .insert([{
            name: validated.contact_name,
            phone: validated.contact_phone,
            type: 'customer',
          }])
          .select('id')
          .single()

        if (contactError) throw contactError
        contactId = newContact.id
      }
    }

    // Gerar número da venda
    const { data: lastSale } = await supabaseAdmin
      .from('sales')
      .select('sale_number')
      .order('sale_number', { ascending: false })
      .limit(1)
      .single()

    const saleNumber = lastSale ? lastSale.sale_number + 1 : 1

    // Criar venda
    const { data: sale, error: saleError } = await supabaseAdmin
      .from('sales')
      .insert([{
        sale_number: saleNumber,
        contact_id: contactId,
        total_amount: validated.total_amount,
        payment_method: validated.payment_method,
        status: validated.status,
        notes: validated.notes,
      }])
      .select()
      .single()

    if (saleError) throw saleError

    // Criar itens da venda
    const itemsToInsert = validated.items.map(item => ({
      sale_id: sale.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('sale_items')
      .insert(itemsToInsert)

    if (itemsError) throw itemsError

    // Buscar venda completa
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

    return NextResponse.json({ success: true, data: completeSale })
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

