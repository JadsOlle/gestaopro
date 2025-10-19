'use client'

import { useEffect, useState } from 'react'
import { Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Search, Plus, TrendingUp } from 'lucide-react'

interface ContaReceber {
  id: string
  description: string
  amount: number
  due_date: string
  payment_date?: string
  status: 'pending' | 'received' | 'overdue'
  category?: string
  customer?: string
  notes?: string
  payment_method?: string
}

export default function ContasReceberPage() {
  const [contas, setContas] = useState<ContaReceber[]>([])
  const [filteredContas, setFilteredContas] = useState<ContaReceber[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    due_date: '',
    category: '',
    customer: '',
    notes: '',
  })

  useEffect(() => {
    loadContas()
  }, [])

  useEffect(() => {
    filterContas()
  }, [contas, filter, searchTerm])

  const loadContas = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: ContaReceber[] = [
        {
          id: '1',
          description: 'Venda #1234 - João Silva',
          amount: 1500,
          due_date: '2025-01-20',
          status: 'pending',
          category: 'Vendas',
          customer: 'João Silva',
          payment_method: 'Boleto',
        },
        {
          id: '2',
          description: 'Venda #1235 - Maria Santos',
          amount: 850,
          due_date: '2025-01-25',
          status: 'pending',
          category: 'Vendas',
          customer: 'Maria Santos',
          payment_method: 'PIX',
        },
        {
          id: '3',
          description: 'Venda #1230 - Pedro Costa',
          amount: 2200,
          due_date: '2025-01-03',
          status: 'overdue',
          category: 'Vendas',
          customer: 'Pedro Costa',
          payment_method: 'Boleto',
        },
        {
          id: '4',
          description: 'Venda #1233 - Ana Paula',
          amount: 650,
          due_date: '2024-12-28',
          payment_date: '2024-12-27',
          status: 'received',
          category: 'Vendas',
          customer: 'Ana Paula',
          payment_method: 'Cartão',
        },
        {
          id: '5',
          description: 'Venda #1229 - Carlos Oliveira',
          amount: 3500,
          due_date: '2025-01-01',
          status: 'overdue',
          category: 'Vendas',
          customer: 'Carlos Oliveira',
          payment_method: 'Boleto',
        },
        {
          id: '6',
          description: 'Prestação de serviço - Empresa XYZ',
          amount: 5000,
          due_date: '2025-01-15',
          status: 'pending',
          category: 'Serviços',
          customer: 'Empresa XYZ',
          payment_method: 'Transferência',
        },
      ]
      setContas(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar contas:', error)
      setLoading(false)
    }
  }

  const filterContas = () => {
    let filtered = contas

    // Filtro por status
    if (filter === 'pending') {
      filtered = filtered.filter(c => c.status === 'pending')
    } else if (filter === 'received') {
      filtered = filtered.filter(c => c.status === 'received')
    } else if (filter === 'overdue') {
      filtered = filtered.filter(c => c.status === 'overdue')
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredContas(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aqui você implementaria a chamada à API
    alert('Conta a receber cadastrada com sucesso!')
    setShowForm(false)
    setFormData({
      description: '',
      amount: '',
      due_date: '',
      category: '',
      customer: '',
      notes: '',
    })
    loadContas()
  }

  const handleReceber = (id: string) => {
    if (confirm('Confirma o recebimento desta conta?')) {
      // Aqui você implementaria a chamada à API para marcar como recebida
      alert('Conta marcada como recebida!')
      loadContas()
    }
  }

  const totalPendente = contas.filter(c => c.status === 'pending').reduce((acc, c) => acc + c.amount, 0)
  const totalVencido = contas.filter(c => c.status === 'overdue').reduce((acc, c) => acc + c.amount, 0)
  const totalRecebido = contas.filter(c => c.status === 'received').reduce((acc, c) => acc + c.amount, 0)
  const contasVencidas = contas.filter(c => c.status === 'overdue').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando contas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Contas a Receber</h1>
            <p className="text-gray-600">Controle de valores a receber de clientes</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Nova Conta'}
          </button>
        </div>

        {/* Alertas de Inadimplência */}
        {contasVencidas > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-bold text-orange-900">Atenção! Clientes Inadimplentes</div>
                <div className="text-sm text-orange-700">
                  Você tem {contasVencidas} conta(s) vencida(s) no valor total de R$ {totalVencido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">A Receber</div>
            <div className="text-3xl font-bold text-blue-600">
              R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {contas.filter(c => c.status === 'pending').length} contas
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Vencidas (Inadimplência)</div>
            <div className="text-3xl font-bold text-orange-600">
              R$ {totalVencido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {contasVencidas} contas
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Recebidas</div>
            <div className="text-3xl font-bold text-green-600">
              R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {contas.filter(c => c.status === 'received').length} contas
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-3xl font-bold text-purple-600">
              R$ {(totalPendente + totalVencido + totalRecebido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {contas.length} contas
            </div>
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Nova Conta a Receber</h2>
            <form onSubmit={handleSubmit}>
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: Venda #1236 - Cliente Nome"
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
                      className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Vencimento *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Nome do cliente"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Informações adicionais..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
                  >
                    Cadastrar Conta
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Buscar por descrição, cliente ou categoria..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                A Receber
              </button>
              <button
                onClick={() => setFilter('overdue')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'overdue' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vencidas
              </button>
              <button
                onClick={() => setFilter('received')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'received' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recebidas
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Contas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vencimento</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContas.map((conta) => (
                  <tr key={conta.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{conta.description}</div>
                      {conta.payment_method && (
                        <div className="text-xs text-gray-500 mt-1">
                          Forma: {conta.payment_method}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{conta.customer || '-'}</td>
                    <td className="px-6 py-4">
                      {conta.category ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">
                          {conta.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        R$ {conta.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">
                          {new Date(conta.due_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {conta.payment_date && (
                        <div className="text-xs text-gray-500 mt-1">
                          Recebido em {new Date(conta.payment_date).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {conta.status === 'received' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Recebida
                        </span>
                      ) : conta.status === 'overdue' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-medium flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          Vencida
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" />
                          A Receber
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {conta.status !== 'received' && (
                        <button
                          onClick={() => handleReceber(conta.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          Receber
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredContas.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'Nenhuma conta encontrada com os filtros aplicados.'
                : 'Nenhuma conta cadastrada. Clique em "Nova Conta" para começar.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

