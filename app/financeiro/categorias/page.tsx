'use client'

import { useEffect, useState } from 'react'
import { Tag, Plus, Edit2, Trash2, TrendingUp, TrendingDown, Search } from 'lucide-react'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color: string
  icon?: string
  description?: string
  transactions_count?: number
  total_amount?: number
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: '#3b82f6',
    description: '',
  })

  const colorOptions = [
    { value: '#3b82f6', label: 'Azul' },
    { value: '#10b981', label: 'Verde' },
    { value: '#ef4444', label: 'Vermelho' },
    { value: '#f59e0b', label: 'Laranja' },
    { value: '#8b5cf6', label: 'Roxo' },
    { value: '#ec4899', label: 'Rosa' },
    { value: '#06b6d4', label: 'Ciano' },
    { value: '#84cc16', label: 'Lima' },
  ]

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    filterCategories()
  }, [categories, filter, searchTerm])

  const loadCategories = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: Category[] = [
        {
          id: '1',
          name: 'Vendas',
          type: 'income',
          color: '#10b981',
          description: 'Receitas de vendas de produtos',
          transactions_count: 45,
          total_amount: 67500,
        },
        {
          id: '2',
          name: 'Serviços',
          type: 'income',
          color: '#3b82f6',
          description: 'Receitas de prestação de serviços',
          transactions_count: 12,
          total_amount: 30000,
        },
        {
          id: '3',
          name: 'Consultoria',
          type: 'income',
          color: '#8b5cf6',
          description: 'Receitas de consultoria',
          transactions_count: 8,
          total_amount: 24000,
        },
        {
          id: '4',
          name: 'Fornecedores',
          type: 'expense',
          color: '#ef4444',
          description: 'Compras de fornecedores',
          transactions_count: 32,
          total_amount: 48000,
        },
        {
          id: '5',
          name: 'Aluguel',
          type: 'expense',
          color: '#f59e0b',
          description: 'Aluguel de imóvel comercial',
          transactions_count: 12,
          total_amount: 24000,
        },
        {
          id: '6',
          name: 'Utilidades',
          type: 'expense',
          color: '#06b6d4',
          description: 'Energia, água, internet',
          transactions_count: 36,
          total_amount: 12600,
        },
        {
          id: '7',
          name: 'Marketing',
          type: 'expense',
          color: '#ec4899',
          description: 'Despesas com marketing e publicidade',
          transactions_count: 18,
          total_amount: 10800,
        },
        {
          id: '8',
          name: 'Pessoal',
          type: 'expense',
          color: '#84cc16',
          description: 'Salários e encargos',
          transactions_count: 12,
          total_amount: 102000,
        },
      ]
      setCategories(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      setLoading(false)
    }
  }

  const filterCategories = () => {
    let filtered = categories

    // Filtro por tipo
    if (filter === 'income') {
      filtered = filtered.filter(c => c.type === 'income')
    } else if (filter === 'expense') {
      filtered = filtered.filter(c => c.type === 'expense')
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCategories(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      // Aqui você implementaria a chamada à API para editar
      alert('Categoria atualizada com sucesso!')
    } else {
      // Aqui você implementaria a chamada à API para criar
      alert('Categoria criada com sucesso!')
    }
    
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      type: 'expense',
      color: '#3b82f6',
      description: '',
    })
    loadCategories()
  }

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      type: category.type,
      color: category.color,
      description: category.description || '',
    })
    setEditingId(category.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      // Aqui você implementaria a chamada à API para excluir
      alert('Categoria excluída com sucesso!')
      loadCategories()
    }
  }

  const totalReceitas = categories.filter(c => c.type === 'income').reduce((acc, c) => acc + (c.total_amount || 0), 0)
  const totalDespesas = categories.filter(c => c.type === 'expense').reduce((acc, c) => acc + (c.total_amount || 0), 0)
  const categoriasReceitas = categories.filter(c => c.type === 'income').length
  const categoriasDespesas = categories.filter(c => c.type === 'expense').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando categorias...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Categorias Financeiras</h1>
            <p className="text-gray-600">Organize suas receitas e despesas por categorias</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                name: '',
                type: 'expense',
                color: '#3b82f6',
                description: '',
              })
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Nova Categoria'}
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Categorias de Receitas</div>
            <div className="text-3xl font-bold text-green-600">{categoriasReceitas}</div>
            <div className="text-sm text-gray-500 mt-1">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Categorias de Despesas</div>
            <div className="text-3xl font-bold text-red-600">{categoriasDespesas}</div>
            <div className="text-sm text-gray-500 mt-1">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Categorias</div>
            <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              Ativas no sistema
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Transações Totais</div>
            <div className="text-3xl font-bold text-blue-600">
              {categories.reduce((acc, c) => acc + (c.transactions_count || 0), 0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Categorizadas
            </div>
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Marketing Digital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`h-12 rounded-lg border-2 transition ${
                          formData.color === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Personalizada
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descrição da categoria..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-bold text-lg"
                  >
                    {editingId ? 'Atualizar Categoria' : 'Criar Categoria'}
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
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Buscar categorias..."
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
          </div>
        </div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4"
              style={{ borderLeftColor: category.color }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Tag className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        category.type === 'income'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {category.description && (
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Transações</div>
                  <div className="text-lg font-bold text-gray-900">
                    {category.transactions_count || 0}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total</div>
                  <div className={`text-lg font-bold ${category.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {(category.total_amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'Nenhuma categoria encontrada com os filtros aplicados.'
                : 'Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

