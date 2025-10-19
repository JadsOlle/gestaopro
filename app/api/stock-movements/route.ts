import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const product_id = searchParams.get('product_id')

    let query = supabase
      .from('stock_movements')
      .select(`
        *,
        product:products(name, sku)
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (product_id) {
      query = query.eq('product_id', product_id)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao buscar movimentações:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Erro ao buscar movimentações:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    const body = await request.json()

    const { product_id, type, quantity, reason } = body

    if (!product_id || !type || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: product_id, type, quantity' },
        { status: 400 }
      )
    }

    // Buscar produto atual
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Validar estoque para saídas
    if (type === 'out' && quantity > product.stock) {
      return NextResponse.json(
        { success: false, error: 'Estoque insuficiente' },
        { status: 400 }
      )
    }

    // Calcular novo estoque
    const newStock = type === 'in' ? product.stock + quantity : product.stock - quantity

    // Iniciar transação
    // 1. Criar movimentação
    const { data: movement, error: movementError } = await supabase
      .from('stock_movements')
      .insert({
        product_id,
        type,
        quantity,
        reason: reason || null,
      })
      .select()
      .single()

    if (movementError) {
      console.error('Erro ao criar movimentação:', movementError)
      return NextResponse.json({ success: false, error: movementError.message }, { status: 500 })
    }

    // 2. Atualizar estoque do produto
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', product_id)

    if (updateError) {
      console.error('Erro ao atualizar estoque:', updateError)
      // Tentar reverter a movimentação
      await supabase.from('stock_movements').delete().eq('id', movement.id)
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: movement })
  } catch (error: any) {
    console.error('Erro ao criar movimentação:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

