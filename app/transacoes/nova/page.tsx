'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

interface Category {
  id: string
  name: string
  type: string
}

interface BankAccount {
  id: string
  name: string
  balance: number
}

export default function NovaTransacaoPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'income',
    description: '',
    amount: '',
    transaction_date: new Date().toISOString().split('T')[0],
    category_id: '',
    bank_account_id: '',
    payment_method: 'pix',
    status: 'paid',
    notes: '',
  })

  useEffect(() => {
    loadCategories()
    loadBankAccounts()
  }, [])

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const result = await res.json()
      if (result.success) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const loadBankAccounts = async () => {
    try {
      const res = await fetch('/api/bank-accounts')
      const result = await res.json()
      if (result.success) {
        setBankAccounts(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar contas bancárias:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.description || !formData.amount) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      })

      const result = await res.json()

      if (result.success) {
        alert('Transação criada com sucesso!')
        router.push('/transacoes')
      } else {
        alert('Erro ao criar transação: ' + result.error)
      }
    } catch (error) {
      console.error('Erro ao criar transação:', error)
      alert('Erro ao criar transação')
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.filter(c => c.type === formData.type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nova Transação</h1>
          <p className="text-gray-600">Registre uma receita ou despesa</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tipo de Transação */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tipo de Transação</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income', category_id: '' })}
                className={`p-6 rounded-xl border-2 transition ${
                  formData.type === 'income'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Receita</span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Entrada de dinheiro (vendas, serviços, etc.)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense', category_id: '' })}
                className={`p-6 rounded-xl border-2 transition ${
                  formData.type === 'expense'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Despesa</span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Saída de dinheiro (compras, contas, etc.)
                </p>
              </button>
            </div>
          </div>

          {/* Dados da Transação */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Dados da Transação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Venda de produtos, Pagamento de fornecedor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.transaction_date}
                  onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  {filteredCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conta Bancária
                </label>
                <select
                  value={formData.bank_account_id}
                  onChange={(e) => setFormData({ ...formData, bank_account_id: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma conta</option>
                  {bankAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} (Saldo: R$ {acc.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forma de Pagamento *
                </label>
                <select
                  required
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pix">PIX</option>
                  <option value="credit_card">Cartão de Crédito</option>
                  <option value="debit_card">Cartão de Débito</option>
                  <option value="cash">Dinheiro</option>
                  <option value="bank_transfer">Transferência Bancária</option>
                  <option value="check">Cheque</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Informações adicionais sobre a transação..."
                />
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className={`rounded-xl shadow-lg p-6 mb-6 ${
            formData.type === 'income' 
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200'
              : 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  formData.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <DollarSign className={`w-6 h-6 ${
                    formData.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    {formData.type === 'income' ? 'Receita' : 'Despesa'}
                  </div>
                  <div className={`text-3xl font-bold ${
                    formData.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.type === 'income' ? '+' : '-'} R$ {formData.amount || '0,00'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-medium text-gray-900">
                  {formData.status === 'paid' ? 'Pago' : formData.status === 'pending' ? 'Pendente' : 'Cancelado'}
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.push('/transacoes')}
              className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-300 transition font-medium text-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-4 rounded-lg transition font-bold text-lg text-white ${
                formData.type === 'income'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {loading ? 'Salvando...' : 'Salvar Transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

