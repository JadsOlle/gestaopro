'use client'

import { useEffect, useState } from 'react'
import { DollarSign, TrendingUp, Users, Calendar, Award, Filter, Search } from 'lucide-react'

interface Comissao {
  id: string
  seller_name: string
  period: string
  total_sales: number
  commission_rate: number
  commission_value: number
  status: 'paid' | 'pending' | 'approved'
  payment_date?: string
  sales_count: number
}

export default function ComissoesPage() {
  const [comissoes, setComissoes] = useState<Comissao[]>([])
  const [filteredComissoes, setFilteredComissoes] = useState<Comissao[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadComissoes()
  }, [])

  useEffect(() => {
    filterComissoes()
  }, [comissoes, filter, searchTerm])

  const loadComissoes = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: Comissao[] = [
        {
          id: '1',
          seller_name: 'João Silva',
          period: 'Janeiro 2025',
          total_sales: 87500,
          commission_rate: 5,
          commission_value: 4375,
          status: 'pending',
          sales_count: 45,
        },
        {
          id: '2',
          seller_name: 'Maria Santos',
          period: 'Janeiro 2025',
          total_sales: 65000,
          commission_rate: 4.5,
          commission_value: 2925,
          status: 'pending',
          sales_count: 32,
        },
        {
          id: '3',
          seller_name: 'João Silva',
          period: 'Dezembro 2024',
          total_sales: 125000,
          commission_rate: 5,
          commission_value: 6250,
          status: 'paid',
          payment_date: '2025-01-05',
          sales_count: 68,
        },
        {
          id: '4',
          seller_name: 'Carlos Oliveira',
          period: 'Janeiro 2025',
          total_sales: 42000,
          commission_rate: 4,
          commission_value: 1680,
          status: 'approved',
          sales_count: 18,
        },
        {
          id: '5',
          seller_name: 'Maria Santos',
          period: 'Dezembro 2024',
          total_sales: 78000,
          commission_rate: 4.5,
          commission_value: 3510,
          status: 'paid',
          payment_date: '2025-01-05',
          sales_count: 41,
        },
        {
          id: '6',
          seller_name: 'Ana Paula',
          period: 'Janeiro 2025',
          total_sales: 55000,
          commission_rate: 4,
          commission_value: 2200,
          status: 'pending',
          sales_count: 28,
        },
      ]
      setComissoes(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar comissões:', error)
      setLoading(false)
    }
  }

  const filterComissoes = () => {
    let filtered = comissoes

    // Filtro por status
    if (filter === 'paid') {
      filtered = filtered.filter(c => c.status === 'paid')
    } else if (filter === 'pending') {
      filtered = filtered.filter(c => c.status === 'pending')
    } else if (filter === 'approved') {
      filtered = filtered.filter(c => c.status === 'approved')
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.seller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.period.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredComissoes(filtered)
  }

  const handlePayCommission = (id: string) => {
    if (window.confirm('Confirmar pagamento desta comissão?')) {
      window.alert('Comissão paga com sucesso!')
      loadComissoes()
    }
  }

  const handleApproveCommission = (id: string) => {
    if (window.confirm('Aprovar esta comissão para pagamento?')) {
      window.alert('Comissão aprovada com sucesso!')
      loadComissoes()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paga'
      case 'approved':
        return 'Aprovada'
      case 'pending':
        return 'Pendente'
      default:
        return status
    }
  }

  const totalComissoes = filteredComissoes.reduce((sum, c) => sum + c.commission_value, 0)
  const totalVendas = filteredComissoes.reduce((sum, c) => sum + c.total_sales, 0)
  const comissoesPagas = filteredComissoes.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.commission_value, 0)
  const comissoesPendentes = filteredComissoes.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.commission_value, 0)
  const vendedoresUnicos = [...new Set(filteredComissoes.map(c => c.seller_name))].length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando comissões...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Comissões de Vendas</h1>
          <p className="text-gray-600">Gerencie e acompanhe as comissões dos vendedores</p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Comissões</div>
            <div className="text-2xl font-bold text-purple-600">
              R$ {totalComissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">Período filtrado</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Vendas</div>
            <div className="text-2xl font-bold text-blue-600">
              R$ {totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">Faturamento</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Pagas</div>
            <div className="text-2xl font-bold text-green-600">
              R$ {comissoesPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">Quitadas</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Pendentes</div>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {comissoesPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">A pagar</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Vendedores</div>
            <div className="text-2xl font-bold text-orange-600">{vendedoresUnicos}</div>
            <div className="text-sm text-gray-500 mt-1">Ativos</div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Buscar por vendedor ou período..."
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                  filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Todas
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Aprovadas
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pagas
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Comissões */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Vendedor</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Período</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Vendas</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Total Vendido</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Taxa</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Comissão</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComissoes.map((comissao) => (
                  <tr key={comissao.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{comissao.seller_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{comissao.period}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium">{comissao.sales_count}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium">
                      R$ {comissao.total_sales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {comissao.commission_rate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-green-600">
                        R$ {comissao.commission_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comissao.status)}`}>
                        {getStatusLabel(comissao.status)}
                      </span>
                      {comissao.payment_date && (
                        <div className="text-xs text-gray-500 mt-1">
                          Pago em {new Date(comissao.payment_date).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {comissao.status === 'pending' && (
                        <button
                          onClick={() => handleApproveCommission(comissao.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        >
                          Aprovar
                        </button>
                      )}
                      {comissao.status === 'approved' && (
                        <button
                          onClick={() => handlePayCommission(comissao.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          Pagar
                        </button>
                      )}
                      {comissao.status === 'paid' && (
                        <span className="text-green-600 font-medium text-sm">✓ Paga</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredComissoes.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center mt-8">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma comissão encontrada</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all'
                ? 'Tente ajustar os filtros de busca.'
                : 'Não há comissões cadastradas no momento.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

