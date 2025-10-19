'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, AlertCircle, Package, TrendingDown, Clock, Search, ShoppingCart, Plus } from 'lucide-react'
import Link from 'next/link'

interface Alert {
  id: string
  product_id: string
  product_name: string
  sku: string
  type: 'low_stock' | 'out_of_stock' | 'no_movement' | 'expiring'
  severity: 'high' | 'medium' | 'low'
  current_quantity: number
  minimum_quantity?: number
  last_movement_date?: string
  expiry_date?: string
  message: string
}

export default function AlertasPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadAlerts()
  }, [])

  useEffect(() => {
    filterAlerts()
  }, [alerts, filter, searchTerm])

  const loadAlerts = async () => {
    try {
      // Dados simulados - em produção viriam da API
      const mockData: Alert[] = [
        {
          id: '1',
          product_id: '1',
          product_name: 'Notebook Dell Inspiron',
          sku: 'NB-DELL-001',
          type: 'low_stock',
          severity: 'high',
          current_quantity: 3,
          minimum_quantity: 10,
          message: 'Estoque abaixo do mínimo (3/10 unidades)',
        },
        {
          id: '2',
          product_id: '2',
          product_name: 'Mouse Logitech MX Master',
          sku: 'MS-LOG-002',
          type: 'out_of_stock',
          severity: 'high',
          current_quantity: 0,
          minimum_quantity: 20,
          message: 'Produto sem estoque disponível',
        },
        {
          id: '3',
          product_id: '3',
          product_name: 'Teclado Mecânico Keychron',
          sku: 'KB-KEY-003',
          type: 'low_stock',
          severity: 'medium',
          current_quantity: 8,
          minimum_quantity: 15,
          message: 'Estoque abaixo do mínimo (8/15 unidades)',
        },
        {
          id: '4',
          product_id: '4',
          product_name: 'Monitor LG 27"',
          sku: 'MN-LG-004',
          type: 'no_movement',
          severity: 'low',
          current_quantity: 20,
          last_movement_date: '2024-11-15',
          message: 'Sem movimentação há 65 dias',
        },
        {
          id: '5',
          product_id: '5',
          product_name: 'Webcam Logitech C920',
          sku: 'WC-LOG-005',
          type: 'out_of_stock',
          severity: 'high',
          current_quantity: 0,
          minimum_quantity: 15,
          message: 'Produto sem estoque disponível',
        },
        {
          id: '6',
          product_id: '6',
          product_name: 'Headset HyperX Cloud',
          sku: 'HS-HYP-006',
          type: 'low_stock',
          severity: 'medium',
          current_quantity: 5,
          minimum_quantity: 20,
          message: 'Estoque abaixo do mínimo (5/20 unidades)',
        },
        {
          id: '7',
          product_id: '7',
          product_name: 'SSD Samsung 1TB',
          sku: 'SD-SAM-007',
          type: 'no_movement',
          severity: 'low',
          current_quantity: 60,
          last_movement_date: '2024-12-01',
          message: 'Sem movimentação há 49 dias',
        },
        {
          id: '8',
          product_id: '8',
          product_name: 'Memória RAM 16GB DDR4',
          sku: 'RM-DDR-008',
          type: 'low_stock',
          severity: 'high',
          current_quantity: 2,
          minimum_quantity: 30,
          message: 'Estoque crítico (2/30 unidades)',
        },
      ]
      setAlerts(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar alertas:', error)
      setLoading(false)
    }
  }

  const filterAlerts = () => {
    let filtered = alerts

    // Filtro por tipo
    if (filter === 'low_stock') {
      filtered = filtered.filter(a => a.type === 'low_stock')
    } else if (filter === 'out_of_stock') {
      filtered = filtered.filter(a => a.type === 'out_of_stock')
    } else if (filter === 'no_movement') {
      filtered = filtered.filter(a => a.type === 'no_movement')
    } else if (filter === 'high_severity') {
      filtered = filtered.filter(a => a.severity === 'high')
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAlerts(filtered)
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return <AlertTriangle className="w-5 h-5" />
      case 'low_stock':
        return <TrendingDown className="w-5 h-5" />
      case 'no_movement':
        return <Clock className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-500 text-red-900'
      case 'medium':
        return 'bg-orange-50 border-orange-500 text-orange-900'
      case 'low':
        return 'bg-yellow-50 border-yellow-500 text-yellow-900'
      default:
        return 'bg-gray-50 border-gray-500 text-gray-900'
    }
  }

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'low_stock':
        return 'bg-orange-100 text-orange-800'
      case 'no_movement':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertLabel = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return 'Sem Estoque'
      case 'low_stock':
        return 'Estoque Baixo'
      case 'no_movement':
        return 'Sem Movimentação'
      case 'expiring':
        return 'Próximo ao Vencimento'
      default:
        return 'Alerta'
    }
  }

  const totalAlerts = alerts.length
  const highSeverity = alerts.filter(a => a.severity === 'high').length
  const outOfStock = alerts.filter(a => a.type === 'out_of_stock').length
  const lowStock = alerts.filter(a => a.type === 'low_stock').length
  const noMovement = alerts.filter(a => a.type === 'no_movement').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando alertas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Alertas de Estoque</h1>
            <p className="text-gray-600">Monitore produtos que precisam de atenção</p>
          </div>
          <Link
            href="/produtos"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            Ver Produtos
          </Link>
        </div>

        {/* Alerta Crítico */}
        {highSeverity > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <div className="font-bold text-red-900 text-xl">Atenção! Alertas Críticos</div>
                <div className="text-red-700 mt-1">
                  {highSeverity} produto(s) com alerta de alta prioridade requerem ação imediata
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Alertas</div>
            <div className="text-3xl font-bold text-purple-600">{totalAlerts}</div>
            <div className="text-sm text-gray-500 mt-1">Ativos no sistema</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Alta Prioridade</div>
            <div className="text-3xl font-bold text-red-600">{highSeverity}</div>
            <div className="text-sm text-gray-500 mt-1">Requer ação imediata</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Sem Estoque</div>
            <div className="text-3xl font-bold text-red-600">{outOfStock}</div>
            <div className="text-sm text-gray-500 mt-1">Produtos zerados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Estoque Baixo</div>
            <div className="text-3xl font-bold text-orange-600">{lowStock}</div>
            <div className="text-sm text-gray-500 mt-1">Abaixo do mínimo</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Sem Movimentação</div>
            <div className="text-3xl font-bold text-yellow-600">{noMovement}</div>
            <div className="text-sm text-gray-500 mt-1">Produtos parados</div>
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
                placeholder="Buscar por produto ou SKU..."
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('high_severity')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'high_severity' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Críticos
              </button>
              <button
                onClick={() => setFilter('out_of_stock')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'out_of_stock' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sem Estoque
              </button>
              <button
                onClick={() => setFilter('low_stock')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'low_stock' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Baixo
              </button>
              <button
                onClick={() => setFilter('no_movement')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'no_movement' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Parados
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl shadow-lg p-6 border-l-4 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    alert.severity === 'high' ? 'bg-red-100' :
                    alert.severity === 'medium' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{alert.product_name}</h3>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${getAlertBadgeColor(alert.type)}`}>
                        {getAlertLabel(alert.type)}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-mono">
                        {alert.sku}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-3">{alert.message}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">Estoque Atual:</span>
                        <span className={`font-bold ml-2 ${
                          alert.current_quantity === 0 ? 'text-red-600' :
                          alert.current_quantity < (alert.minimum_quantity || 0) ? 'text-orange-600' : 'text-gray-900'
                        }`}>
                          {alert.current_quantity} un
                        </span>
                      </div>
                      
                      {alert.minimum_quantity && (
                        <div>
                          <span className="text-gray-600">Mínimo:</span>
                          <span className="font-bold text-gray-900 ml-2">{alert.minimum_quantity} un</span>
                        </div>
                      )}
                      
                      {alert.last_movement_date && (
                        <div>
                          <span className="text-gray-600">Última Movimentação:</span>
                          <span className="font-bold text-gray-900 ml-2">
                            {new Date(alert.last_movement_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => alert('Comprar produto')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </button>
                  <button
                    onClick={() => alert('Adicionar estoque manualmente')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchTerm || filter !== 'all' ? 'Nenhum alerta encontrado' : 'Nenhum alerta ativo'}
            </h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all'
                ? 'Tente ajustar os filtros de busca.'
                : 'Todos os produtos estão com estoque adequado!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

