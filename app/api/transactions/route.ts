import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

// GET /api/transactions - Listar transações
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100
    const type = searchParams.get('type') // 'income' ou 'expense'
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    let query = supabaseAdmin
      .from('transactions')
      .select(`
        *,
        category:categories(name, type),
        bank_account:bank_accounts(name, bank_name),
        contact:contacts(name, phone)
      `)
      .order('transaction_date', { ascending: false })
      .limit(limit)

    if (type) {
      query = query.eq('type', type)
    }

    if (startDate) {
      query = query.gte('transaction_date', startDate)
    }

    if (endDate) {
      query = query.lte('transaction_date', endDate)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Criar transação
const createTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  description: z.string(),
  amount: z.number().positive(),
  transaction_date: z.string(),
  category_id: z.string().uuid().optional(),
  bank_account_id: z.string().uuid().optional(),
  contact_id: z.string().uuid().optional(),
  payment_method: z.enum(['pix', 'credit_card', 'debit_card', 'cash', 'bank_transfer', 'other']).optional(),
  status: z.enum(['pending', 'paid', 'cancelled']).default('paid'),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createTransactionSchema.parse(body)

    const { data, error } = await supabaseAdmin
      .from('transactions')
      .insert([validated])
      .select(`
        *,
        category:categories(name, type),
        bank_account:bank_accounts(name, bank_name),
        contact:contacts(name, phone)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
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

// PATCH /api/transactions/:id - Atualizar transação
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from('transactions')
      .update(body)
      .eq('id', id)
      .select(`
        *,
        category:categories(name, type),
        bank_account:bank_accounts(name, bank_name),
        contact:contacts(name, phone)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

