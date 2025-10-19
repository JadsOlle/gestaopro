'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Calendar, Search, Filter, Plus } from 'lucide-react'
import Link from 'next/link'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: number
  transaction_date: string
  status: 'completed' | 'pending' | 'cancelled'
  payment_method?: string
  category?: string
  notes?: string
}

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, filter, searchTerm, dateFilter])

  const loadTransactions = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: Transaction[] = [
        {
          id: '1',
          type: 'income',
          description: 'Venda de produtos',
          amount: 1500,
          transaction_date: '2025-01-15',
          status: 'completed',
          payment_method: 'PIX',
          category: 'Vendas',
        },
        {
          id: '2',
          type: 'expense',
          description: 'Compra de estoque',
          amount: 800,
          transaction_date: '2025-01-14',
          status: 'completed',
          payment_method: 'Boleto',
          category: 'Fornecedores',
        },
        {
          id: '3',
          type: 'income',
          description: 'Prestação de serviço',
          amount: 2500,
          transaction_date: '2025-01-13',
          status: 'completed',
          payment_method: 'Transferência',
          category: 'Serviços',
        },
        {
          id: '4',
          type: 'expense',
          description: 'Aluguel do imóvel',
          amount: 2000,
          transaction_date: '2025-01-10',
          status: 'completed',
          payment_method: 'Transferência',
          category: 'Aluguel',
        },
        {
          id: '5',
          type: 'expense',
          description: 'Energia elétrica',
          amount: 350,
          transaction_date: '2025-01-12',
          status: 'completed',
          payment_method: 'Débito Automático',
          category: 'Utilidades',
        },
        {
          id: '6',
          type: 'income',
          description: 'Venda de produtos',
          amount: 950,
          transaction_date: '2025-01-16',
          status: 'pending',
          payment_method: 'Boleto',
          category: 'Vendas',
        },
        {
          id: '7',
          type: 'expense',
          description: 'Marketing digital',
          amount: 600,
          transaction_date: '2025-01-11',
          status: 'completed',
          payment_method: 'Cartão',
          category: 'Marketing',
        },
        {
          id: '8',
          type: 'income',
          description: 'Consultoria',
          amount: 3000,
          transaction_date: '2025-01-09',
          status: 'completed',
          payment_method: 'PIX',
          category: 'Serviços',
        },
      ]
      setTransactions(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar transações:', error)
      setLoading(false)
    }
  }

  const filterTransactions = () => {
    let filtered = transactions

    // Filtro por tipo
    if (filter === 'income') {
      filtered = filtered.filter(t => t.type === 'income')
    } else if (filter === 'expense') {
      filtered = filtered.filter(t => t.type === 'expense')
    }

    // Filtro por data
    if (dateFilter !== 'all') {
      const today = new Date()
      const transactionDate = (t: Transaction) => new Date(t.transaction_date)
      
      if (dateFilter === 'today') {
        filtered = filtered.filter(t => {
          const date = transactionDate(t)
          return date.toDateString() === today.toDateString()
        })
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(t => transactionDate(t) >= weekAgo)
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(t => transactionDate(t) >= monthAgo)
      }
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.payment_method?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTransactions(filtered)
  }

  const totalReceitas = transactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0)
  const totalDespesas = transactions.filter(t => t.type === 'expense' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0)
  const saldo = totalReceitas - totalDespesas
  const transacoesPendentes = transactions.filter(t => t.status === 'pending').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando transações...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Transações Financeiras</h1>
            <p className="text-gray-600">Controle completo de receitas e despesas</p>
          </div>
          <Link
            href="/transacoes/nova"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Transação
          </Link>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Receitas</div>
            <div className="text-3xl font-bold text-green-600">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {transactions.filter(t => t.type === 'income').length} transações
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Despesas</div>
            <div className="text-3xl font-bold text-red-600">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {transactions.filter(t => t.type === 'expense').length} transações
            </div>
          </div>

          <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${saldo >= 0 ? 'border-blue-500' : 'border-orange-500'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`${saldo >= 0 ? 'bg-blue-100' : 'bg-orange-100'} p-3 rounded-lg`}>
                <DollarSign className={`w-6 h-6 ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Saldo</div>
            <div className={`text-3xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              R$ {Math.abs(saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {saldo >= 0 ? 'Positivo' : 'Negativo'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Pendentes</div>
            <div className="text-3xl font-bold text-yellow-600">
              {transacoesPendentes}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Aguardando confirmação
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar transações..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('income')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setFilter('expense')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Despesas
              </button>
            </div>

            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as datas</option>
                <option value="today">Hoje</option>
                <option value="week">Últimos 7 dias</option>
                <option value="month">Últimos 30 dias</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Forma de Pagamento</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">
                          {new Date(transaction.transaction_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.category ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">
                          {transaction.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {transaction.payment_method || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.type === 'income' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium flex items-center gap-1 w-fit">
                          <TrendingUp className="w-3 h-3" />
                          Receita
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium flex items-center gap-1 w-fit">
                          <TrendingDown className="w-3 h-3" />
                          Despesa
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.status === 'completed' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
                          Concluída
                        </span>
                      ) : transaction.status === 'pending' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                          Pendente
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">
                          Cancelada
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchTerm || filter !== 'all' || dateFilter !== 'all'
                ? 'Nenhuma transação encontrada com os filtros aplicados.'
                : 'Nenhuma transação cadastrada. Clique em "Nova Transação" para começar.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

