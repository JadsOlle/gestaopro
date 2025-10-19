'use client'

import { useEffect, useState } from 'react'
import { Target, TrendingUp, TrendingDown, Calendar, DollarSign, Package, Users, Plus, Edit2, Trash2 } from 'lucide-react'

interface Meta {
  id: string
  period: string
  type: 'revenue' | 'quantity' | 'tickets'
  target_value: number
  current_value: number
  percentage: number
  status: 'achieved' | 'on_track' | 'at_risk' | 'not_achieved'
  start_date: string
  end_date: string
  responsible?: string
}

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    period: '',
    type: 'revenue' as 'revenue' | 'quantity' | 'tickets',
    target_value: '',
    start_date: '',
    end_date: '',
    responsible: '',
  })

  useEffect(() => {
    loadMetas()
  }, [])

  const loadMetas = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: Meta[] = [
        {
          id: '1',
          period: 'Janeiro 2025',
          type: 'revenue',
          target_value: 100000,
          current_value: 87500,
          percentage: 87.5,
          status: 'on_track',
          start_date: '2025-01-01',
          end_date: '2025-01-31',
          responsible: 'João Silva',
        },
        {
          id: '2',
          period: 'Dezembro 2024',
          type: 'revenue',
          target_value: 120000,
          current_value: 125000,
          percentage: 104.2,
          status: 'achieved',
          start_date: '2024-12-01',
          end_date: '2024-12-31',
          responsible: 'João Silva',
        },
        {
          id: '3',
          period: 'Janeiro 2025',
          type: 'quantity',
          target_value: 500,
          current_value: 320,
          percentage: 64,
          status: 'at_risk',
          start_date: '2025-01-01',
          end_date: '2025-01-31',
          responsible: 'Maria Santos',
        },
        {
          id: '4',
          period: 'Novembro 2024',
          type: 'revenue',
          target_value: 90000,
          current_value: 75000,
          percentage: 83.3,
          status: 'not_achieved',
          start_date: '2024-11-01',
          end_date: '2024-11-30',
          responsible: 'João Silva',
        },
        {
          id: '5',
          period: 'Janeiro 2025',
          type: 'tickets',
          target_value: 200,
          current_value: 180,
          percentage: 90,
          status: 'on_track',
          start_date: '2025-01-01',
          end_date: '2025-01-31',
          responsible: 'Carlos Oliveira',
        },
      ]
      setMetas(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar metas:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      window.alert('Meta atualizada com sucesso!')
    } else {
      window.alert('Meta criada com sucesso!')
    }
    
    setShowForm(false)
    setEditingId(null)
    setFormData({
      period: '',
      type: 'revenue',
      target_value: '',
      start_date: '',
      end_date: '',
      responsible: '',
    })
    loadMetas()
  }

  const handleEdit = (meta: Meta) => {
    setFormData({
      period: meta.period,
      type: meta.type,
      target_value: meta.target_value.toString(),
      start_date: meta.start_date,
      end_date: meta.end_date,
      responsible: meta.responsible || '',
    })
    setEditingId(meta.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
      window.alert('Meta excluída com sucesso!')
      loadMetas()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-50 border-green-500 text-green-900'
      case 'on_track':
        return 'bg-blue-50 border-blue-500 text-blue-900'
      case 'at_risk':
        return 'bg-orange-50 border-orange-500 text-orange-900'
      case 'not_achieved':
        return 'bg-red-50 border-red-500 text-red-900'
      default:
        return 'bg-gray-50 border-gray-500 text-gray-900'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'Atingida'
      case 'on_track':
        return 'No Caminho'
      case 'at_risk':
        return 'Em Risco'
      case 'not_achieved':
        return 'Não Atingida'
      default:
        return 'Indefinido'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'revenue':
        return 'Faturamento'
      case 'quantity':
        return 'Quantidade'
      case 'tickets':
        return 'Tickets'
      default:
        return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue':
        return <DollarSign className="w-5 h-5" />
      case 'quantity':
        return <Package className="w-5 h-5" />
      case 'tickets':
        return <Users className="w-5 h-5" />
      default:
        return <Target className="w-5 h-5" />
    }
  }

  const totalMetas = metas.length
  const metasAtingidas = metas.filter(m => m.status === 'achieved').length
  const metasEmAndamento = metas.filter(m => m.status === 'on_track' || m.status === 'at_risk').length
  const metasEmRisco = metas.filter(m => m.status === 'at_risk').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando metas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Metas de Vendas</h1>
            <p className="text-gray-600">Defina e acompanhe suas metas comerciais</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                period: '',
                type: 'revenue',
                target_value: '',
                start_date: '',
                end_date: '',
                responsible: '',
              })
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Nova Meta'}
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Metas</div>
            <div className="text-3xl font-bold text-blue-600">{totalMetas}</div>
            <div className="text-sm text-gray-500 mt-1">Cadastradas</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Metas Atingidas</div>
            <div className="text-3xl font-bold text-green-600">{metasAtingidas}</div>
            <div className="text-sm text-gray-500 mt-1">
              {totalMetas > 0 ? ((metasAtingidas / totalMetas) * 100).toFixed(0) : 0}% do total
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Em Andamento</div>
            <div className="text-3xl font-bold text-purple-600">{metasEmAndamento}</div>
            <div className="text-sm text-gray-500 mt-1">Metas ativas</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Em Risco</div>
            <div className="text-3xl font-bold text-orange-600">{metasEmRisco}</div>
            <div className="text-sm text-gray-500 mt-1">Requer atenção</div>
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Editar Meta' : 'Nova Meta'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Período *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Janeiro 2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Meta *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="revenue">Faturamento (R$)</option>
                    <option value="quantity">Quantidade (unidades)</option>
                    <option value="tickets">Tickets (vendas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor da Meta *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.target_value}
                    onChange={(e) => setFormData({ ...formData, target_value: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsável
                  </label>
                  <input
                    type="text"
                    value={formData.responsible}
                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome do responsável"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Início *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Fim *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg"
                  >
                    {editingId ? 'Atualizar Meta' : 'Criar Meta'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Metas */}
        <div className="space-y-6">
          {metas.map((meta) => (
            <div
              key={meta.id}
              className={`rounded-xl shadow-lg p-6 border-l-4 ${getStatusColor(meta.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    meta.status === 'achieved' ? 'bg-green-100' :
                    meta.status === 'on_track' ? 'bg-blue-100' :
                    meta.status === 'at_risk' ? 'bg-orange-100' : 'bg-red-100'
                  }`}>
                    {getTypeIcon(meta.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{meta.period}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">{getTypeLabel(meta.type)}</span>
                      {meta.responsible && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">Resp: {meta.responsible}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    meta.status === 'achieved' ? 'bg-green-100 text-green-800' :
                    meta.status === 'on_track' ? 'bg-blue-100 text-blue-800' :
                    meta.status === 'at_risk' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusLabel(meta.status)}
                  </span>
                  <button
                    onClick={() => handleEdit(meta)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(meta.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progresso</span>
                  <span className="font-bold">{meta.percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      meta.percentage >= 100 ? 'bg-green-500' :
                      meta.percentage >= 80 ? 'bg-blue-500' :
                      meta.percentage >= 60 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(meta.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Valores */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Meta</div>
                  <div className="text-lg font-bold">
                    {meta.type === 'revenue' ? `R$ ${meta.target_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `${meta.target_value} ${meta.type === 'quantity' ? 'un' : 'vendas'}`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Realizado</div>
                  <div className="text-lg font-bold text-blue-600">
                    {meta.type === 'revenue' ? `R$ ${meta.current_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `${meta.current_value} ${meta.type === 'quantity' ? 'un' : 'vendas'}`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Faltam</div>
                  <div className={`text-lg font-bold ${meta.current_value >= meta.target_value ? 'text-green-600' : 'text-orange-600'}`}>
                    {meta.current_value >= meta.target_value ? '✓ Meta atingida!' : (
                      meta.type === 'revenue' ? `R$ ${(meta.target_value - meta.current_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `${meta.target_value - meta.current_value} ${meta.type === 'quantity' ? 'un' : 'vendas'}`
                    )}
                  </div>
                </div>
              </div>

              {/* Período */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(meta.start_date).toLocaleDateString('pt-BR')} até {new Date(meta.end_date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {metas.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma meta cadastrada</h3>
            <p className="text-gray-600">Clique em "Nova Meta" para começar a definir suas metas de vendas</p>
          </div>
        )}
      </div>
    </div>
  )
}

