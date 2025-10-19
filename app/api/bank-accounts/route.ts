import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

// GET /api/bank-accounts - Listar contas bancárias
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bank_accounts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/bank-accounts - Criar conta bancária
const createBankAccountSchema = z.object({
  name: z.string(),
  bank_name: z.string(),
  account_type: z.enum(['checking', 'savings', 'investment', 'other']).default('checking'),
  initial_balance: z.number().default(0),
  current_balance: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createBankAccountSchema.parse(body)

    // Se current_balance não for fornecido, usar initial_balance
    if (validated.current_balance === undefined) {
      validated.current_balance = validated.initial_balance
    }

    const { data, error } = await supabaseAdmin
      .from('bank_accounts')
      .insert([validated])
      .select()
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

