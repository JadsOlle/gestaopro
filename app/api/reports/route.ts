import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

/**
 * API de Relatórios
 * 
 * Endpoints para gerar relatórios financeiros e operacionais
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    switch (type) {
      case 'financial':
        return await getFinancialReport(startDate, endDate)
      
      case 'sales':
        return await getSalesReport(startDate, endDate)
      
      case 'inventory':
        return await getInventoryReport()
      
      case 'customers':
        return await getCustomersReport()
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid report type' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Relatório Financeiro
async function getFinancialReport(startDate: string | null, endDate: string | null) {
  let query = supabaseAdmin
    .from('transactions')
    .select('*')

  if (startDate) {
    query = query.gte('transaction_date', startDate)
  }

  if (endDate) {
    query = query.lte('transaction_date', endDate)
  }

  const { data: transactions, error } = await query

  if (error) throw error

  const income = transactions
    ?.filter(t => t.type === 'income' && t.status === 'paid')
    .reduce((acc, t) => acc + (t.amount || 0), 0) || 0

  const expenses = transactions
    ?.filter(t => t.type === 'expense' && t.status === 'paid')
    .reduce((acc, t) => acc + (t.amount || 0), 0) || 0

  const pending = transactions
    ?.filter(t => t.status === 'pending')
    .reduce((acc, t) => acc + (t.amount || 0), 0) || 0

  // Agrupar por categoria
  const byCategory: Record<string, number> = {}
  transactions?.forEach(t => {
    if (t.category_id && t.status === 'paid') {
      byCategory[t.category_id] = (byCategory[t.category_id] || 0) + t.amount
    }
  })

  // Buscar nomes das categorias
  const categoryIds = Object.keys(byCategory)
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, name, type')
    .in('id', categoryIds)

  const categoriesWithValues = categories?.map(cat => ({
    ...cat,
    amount: byCategory[cat.id],
  }))

  return NextResponse.json({
    success: true,
    data: {
      summary: {
        income,
        expenses,
        balance: income - expenses,
        pending,
      },
      categories: categoriesWithValues,
      transactions,
    },
  })
}

// Relatório de Vendas
async function getSalesReport(startDate: string | null, endDate: string | null) {
  let query = supabaseAdmin
    .from('sales')
    .select(`
      *,
      contact:contacts(name, phone),
      items:sale_items(
        *,
        product:products(name, sku, category)
      )
    `)

  if (startDate) {
    query = query.gte('created_at', startDate)
  }

  if (endDate) {
    query = query.lte('created_at', endDate)
  }

  const { data: sales, error } = await query

  if (error) throw error

  const totalSales = sales?.reduce((acc, s) => acc + (s.total_amount || 0), 0) || 0
  const paidSales = sales?.filter(s => s.status === 'paid').reduce((acc, s) => acc + (s.total_amount || 0), 0) || 0
  const pendingSales = sales?.filter(s => s.status === 'pending').reduce((acc, s) => acc + (s.total_amount || 0), 0) || 0

  // Top produtos vendidos
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {}
  
  sales?.forEach(sale => {
    sale.items?.forEach((item: any) => {
      const productId = item.product_id
      if (!productSales[productId]) {
        productSales[productId] = {
          name: item.product?.name || 'Unknown',
          quantity: 0,
          revenue: 0,
        }
      }
      productSales[productId].quantity += item.quantity
      productSales[productId].revenue += item.total_price
    })
  })

  const topProducts = Object.entries(productSales)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  return NextResponse.json({
    success: true,
    data: {
      summary: {
        total: totalSales,
        paid: paidSales,
        pending: pendingSales,
        count: sales?.length || 0,
      },
      topProducts,
      sales,
    },
  })
}

// Relatório de Estoque
async function getInventoryReport() {
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('stock', { ascending: true })

  if (error) throw error

  const totalProducts = products?.length || 0
  const lowStock = products?.filter(p => p.stock < (p.min_stock || 10)).length || 0
  const outOfStock = products?.filter(p => p.stock === 0).length || 0

  const totalValue = products?.reduce((acc, p) => {
    return acc + (p.stock * (p.cost_price || 0))
  }, 0) || 0

  return NextResponse.json({
    success: true,
    data: {
      summary: {
        totalProducts,
        lowStock,
        outOfStock,
        totalValue,
      },
      products,
    },
  })
}

// Relatório de Clientes
async function getCustomersReport() {
  const { data: customers, error } = await supabaseAdmin
    .from('contacts')
    .select(`
      *,
      sales:sales(total_amount, status)
    `)
    .eq('type', 'customer')

  if (error) throw error

  const totalCustomers = customers?.length || 0

  // Calcular total de compras por cliente
  const customersWithStats = customers?.map(customer => {
    const totalPurchases = customer.sales?.reduce((acc: number, sale: any) => {
      return acc + (sale.status === 'paid' ? sale.total_amount : 0)
    }, 0) || 0

    const purchaseCount = customer.sales?.filter((s: any) => s.status === 'paid').length || 0

    return {
      ...customer,
      totalPurchases,
      purchaseCount,
    }
  }).sort((a, b) => b.totalPurchases - a.totalPurchases)

  const topCustomers = customersWithStats?.slice(0, 10)

  return NextResponse.json({
    success: true,
    data: {
      summary: {
        totalCustomers,
      },
      topCustomers,
      customers: customersWithStats,
    },
  })
}

