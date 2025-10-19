import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // Total de vendas
    const { data: sales, error: salesError } = await supabaseAdmin
      .from('sales')
      .select('total_amount, status')

    if (salesError) throw salesError

    const totalSales = sales?.reduce((acc, sale) => acc + (sale.total_amount || 0), 0) || 0
    const paidSales = sales?.filter(s => s.status === 'paid').reduce((acc, sale) => acc + (sale.total_amount || 0), 0) || 0
    const pendingSales = sales?.filter(s => s.status === 'pending').reduce((acc, sale) => acc + (sale.total_amount || 0), 0) || 0

    // Total de produtos
    const { count: productsCount, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })

    if (productsError) throw productsError

    // Produtos com estoque baixo
    const { data: lowStockProducts, error: lowStockError } = await supabaseAdmin
      .from('products')
      .select('*')
      .lt('stock', 10)

    if (lowStockError) throw lowStockError

    // Total de clientes
    const { count: customersCount, error: customersError } = await supabaseAdmin
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'customer')

    if (customersError) throw customersError

    return NextResponse.json({
      success: true,
      data: {
        sales: {
          total: totalSales,
          paid: paidSales,
          pending: pendingSales,
          count: sales?.length || 0,
        },
        products: {
          total: productsCount || 0,
          lowStock: lowStockProducts?.length || 0,
        },
        customers: {
          total: customersCount || 0,
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

