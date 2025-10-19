'use client'

import { useEffect, useState } from 'react'
import { Package, ClipboardCheck, AlertTriangle, TrendingUp, TrendingDown, Search, Plus, Save } from 'lucide-react'

interface InventoryItem {
  id: string
  product_id: string
  product_name: string
  sku: string
  system_quantity: number
  physical_quantity: number
  difference: number
  status: 'ok' | 'surplus' | 'shortage'
  last_count_date?: string
  notes?: string
}

export default function InventarioPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    physical_quantity: '',
    notes: '',
  })

  useEffect(() => {
    loadInventory()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, filter, searchTerm])

  const loadInventory = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: InventoryItem[] = [
        {
          id: '1',
          product_id: '1',
          product_name: 'Notebook Dell Inspiron',
          sku: 'NB-DELL-001',
          system_quantity: 15,
          physical_quantity: 15,
          difference: 0,
          status: 'ok',
          last_count_date: '2025-01-15',
        },
        {
          id: '2',
          product_id: '2',
          product_name: 'Mouse Logitech MX Master',
          sku: 'MS-LOG-002',
          system_quantity: 50,
          physical_quantity: 52,
          difference: 2,
          status: 'surplus',
          last_count_date: '2025-01-14',
        },
        {
          id: '3',
          product_id: '3',
          product_name: 'Teclado Mecânico Keychron',
          sku: 'KB-KEY-003',
          system_quantity: 30,
          physical_quantity: 28,
          difference: -2,
          status: 'shortage',
          last_count_date: '2025-01-14',
          notes: 'Possível perda ou venda não registrada',
        },
        {
          id: '4',
          product_id: '4',
          product_name: 'Monitor LG 27"',
          sku: 'MN-LG-004',
          system_quantity: 20,
          physical_quantity: 20,
          difference: 0,
          status: 'ok',
          last_count_date: '2025-01-13',
        },
        {
          id: '5',
          product_id: '5',
          product_name: 'Webcam Logitech C920',
          sku: 'WC-LOG-005',
          system_quantity: 25,
          physical_quantity: 22,
          difference: -3,
          status: 'shortage',
          last_count_date: '2025-01-13',
          notes: 'Verificar vendas recentes',
        },
        {
          id: '6',
          product_id: '6',
          product_name: 'Headset HyperX Cloud',
          sku: 'HS-HYP-006',
          system_quantity: 40,
          physical_quantity: 43,
          difference: 3,
          status: 'surplus',
          last_count_date: '2025-01-12',
        },
        {
          id: '7',
          product_id: '7',
          product_name: 'SSD Samsung 1TB',
          sku: 'SD-SAM-007',
          system_quantity: 60,
          physical_quantity: 60,
          difference: 0,
          status: 'ok',
          last_count_date: '2025-01-15',
        },
        {
          id: '8',
          product_id: '8',
          product_name: 'Memória RAM 16GB DDR4',
          sku: 'RM-DDR-008',
          system_quantity: 80,
          physical_quantity: 75,
          difference: -5,
          status: 'shortage',
          last_count_date: '2025-01-11',
          notes: 'Divergência significativa - investigar',
        },
      ]
      setItems(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar inventário:', error)
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = items

    // Filtro por status
    if (filter === 'ok') {
      filtered = filtered.filter(i => i.status === 'ok')
    } else if (filter === 'surplus') {
      filtered = filtered.filter(i => i.status === 'surplus')
    } else if (filter === 'shortage') {
      filtered = filtered.filter(i => i.status === 'shortage')
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(i =>
        i.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredItems(filtered)
  }

  const handleCount = (item: InventoryItem) => {
    setEditingId(item.id)
    setFormData({
      physical_quantity: item.physical_quantity.toString(),
      notes: item.notes || '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aqui você implementaria a chamada à API para atualizar a contagem
    alert('Contagem atualizada com sucesso!')
    setShowForm(false)
    setEditingId(null)
    setFormData({
      physical_quantity: '',
      notes: '',
    })
    loadInventory()
  }

  const handleAdjust = (id: string) => {
    if (confirm('Confirma o ajuste de estoque baseado na contagem física?')) {
      // Aqui você implementaria a chamada à API para ajustar o estoque no sistema
      alert('Estoque ajustado com sucesso!')
      loadInventory()
    }
  }

  const totalItems = items.length
  const itemsOk = items.filter(i => i.status === 'ok').length
  const itemsSurplus = items.filter(i => i.status === 'surplus').length
  const itemsShortage = items.filter(i => i.status === 'shortage').length
  const totalDifference = items.reduce((acc, i) => acc + Math.abs(i.difference), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando inventário...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventário de Estoque</h1>
            <p className="text-gray-600">Realize contagens e ajustes de estoque</p>
          </div>
          <button
            onClick={() => alert('Iniciar nova contagem completa')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <ClipboardCheck className="w-5 h-5" />
            Nova Contagem
          </button>
        </div>

        {/* Alertas */}
        {itemsShortage > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <div className="font-bold text-red-900">Atenção! Divergências Negativas</div>
                <div className="text-sm text-red-700">
                  {itemsShortage} produto(s) com quantidade física menor que o sistema
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Produtos</div>
            <div className="text-3xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-gray-500 mt-1">Inventariados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <ClipboardCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Corretos</div>
            <div className="text-3xl font-bold text-green-600">{itemsOk}</div>
            <div className="text-sm text-gray-500 mt-1">
              {((itemsOk / totalItems) * 100).toFixed(0)}% do total
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Sobras</div>
            <div className="text-3xl font-bold text-orange-600">{itemsSurplus}</div>
            <div className="text-sm text-gray-500 mt-1">Acima do sistema</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Faltas</div>
            <div className="text-3xl font-bold text-red-600">{itemsShortage}</div>
            <div className="text-sm text-gray-500 mt-1">Abaixo do sistema</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Divergências</div>
            <div className="text-3xl font-bold text-purple-600">{totalDifference}</div>
            <div className="text-sm text-gray-500 mt-1">Unidades totais</div>
          </div>
        </div>

        {/* Modal de Contagem */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Atualizar Contagem</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade Física *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.physical_quantity}
                      onChange={(e) => setFormData({ ...formData, physical_quantity: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Quantidade contada"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Observações sobre a contagem..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingId(null)
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar por produto ou SKU..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('ok')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'ok' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Corretos
              </button>
              <button
                onClick={() => setFilter('surplus')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'surplus' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sobras
              </button>
              <button
                onClick={() => setFilter('shortage')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'shortage' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Faltas
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Inventário */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Qtd. Sistema</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Qtd. Física</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Diferença</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Última Contagem</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.product_name}</div>
                      {item.notes && (
                        <div className="text-xs text-gray-500 mt-1">{item.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-mono">
                        {item.sku}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-gray-900">{item.system_quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-blue-600">{item.physical_quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`font-bold ${
                        item.difference === 0 ? 'text-gray-600' :
                        item.difference > 0 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {item.difference > 0 ? '+' : ''}{item.difference}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'ok' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium flex items-center gap-1 w-fit">
                          <ClipboardCheck className="w-3 h-3" />
                          Correto
                        </span>
                      ) : item.status === 'surplus' ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-medium flex items-center gap-1 w-fit">
                          <TrendingUp className="w-3 h-3" />
                          Sobra
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium flex items-center gap-1 w-fit">
                          <TrendingDown className="w-3 h-3" />
                          Falta
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {item.last_count_date ? new Date(item.last_count_date).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCount(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        >
                          Contar
                        </button>
                        {item.status !== 'ok' && (
                          <button
                            onClick={() => handleAdjust(item.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                          >
                            Ajustar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'Nenhum produto encontrado com os filtros aplicados.'
                : 'Nenhum produto no inventário.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

