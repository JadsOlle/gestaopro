'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, User, Calendar, DollarSign, Package, TrendingUp, Search, Filter } from 'lucide-react'

interface ClienteHistorico {
  id: string
  name: string
  email: string
  total_purchases: number
  total_spent: number
  average_ticket: number
  last_purchase_date: string
  first_purchase_date: string
  purchases: Purchase[]
}

interface Purchase {
  id: string
  date: string
  total: number
  items_count: number
  status: string
  payment_method: string
}

export default function HistoricoComprasPage() {
  const [clientes, setClientes] = useState<ClienteHistorico[]>([])
  const [selectedCliente, setSelectedCliente] = useState<ClienteHistorico | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('total_spent')

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      const mockData: ClienteHistorico[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          total_purchases: 15,
          total_spent: 45000,
          average_ticket: 3000,
          last_purchase_date: '2025-01-15',
          first_purchase_date: '2024-06-10',
          purchases: [
            { id: '1', date: '2025-01-15', total: 3500, items_count: 3, status: 'Concluída', payment_method: 'Cartão' },
            { id: '2', date: '2025-01-05', total: 2800, items_count: 2, status: 'Concluída', payment_method: 'PIX' },
            { id: '3', date: '2024-12-20', total: 4200, items_count: 4, status: 'Concluída', payment_method: 'Cartão' },
          ],
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          total_purchases: 22,
          total_spent: 68000,
          average_ticket: 3090,
          last_purchase_date: '2025-01-18',
          first_purchase_date: '2024-03-15',
          purchases: [
            { id: '4', date: '2025-01-18', total: 5500, items_count: 5, status: 'Concluída', payment_method: 'Cartão' },
            { id: '5', date: '2025-01-10', total: 3200, items_count: 3, status: 'Concluída', payment_method: 'Boleto' },
          ],
        },
        {
          id: '3',
          name: 'Carlos Oliveira',
          email: 'carlos@email.com',
          total_purchases: 8,
          total_spent: 18000,
          average_ticket: 2250,
          last_purchase_date: '2025-01-12',
          first_purchase_date: '2024-09-05',
          purchases: [
            { id: '6', date: '2025-01-12', total: 2500, items_count: 2, status: 'Concluída', payment_method: 'PIX' },
          ],
        },
        {
          id: '4',
          name: 'Ana Paula',
          email: 'ana@email.com',
          total_purchases: 18,
          total_spent: 52000,
          average_ticket: 2888,
          last_purchase_date: '2025-01-16',
          first_purchase_date: '2024-05-20',
          purchases: [
            { id: '7', date: '2025-01-16', total: 3800, items_count: 4, status: 'Concluída', payment_method: 'Cartão' },
          ],
        },
      ]
      setClientes(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      setLoading(false)
    }
  }

  const filteredClientes = clientes
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'total_spent') return b.total_spent - a.total_spent
      if (sortBy === 'total_purchases') return b.total_purchases - a.total_purchases
      if (sortBy === 'average_ticket') return b.average_ticket - a.average_ticket
      return 0
    })

  const totalClientes = clientes.length
  const totalGasto = clientes.reduce((sum, c) => sum + c.total_spent, 0)
  const totalCompras = clientes.reduce((sum, c) => sum + c.total_purchases, 0)
  const ticketMedio = totalGasto / totalCompras || 0

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Carregando...</div></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Histórico de Compras</h1>
          <p className="text-gray-600">Analise o histórico de compras de cada cliente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Clientes</div>
            <div className="text-3xl font-bold text-blue-600">{totalClientes}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Gasto</div>
            <div className="text-3xl font-bold text-green-600">R$ {(totalGasto / 1000).toFixed(0)}k</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Compras</div>
            <div className="text-3xl font-bold text-purple-600">{totalCompras}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Ticket Médio</div>
            <div className="text-3xl font-bold text-orange-600">R$ {(ticketMedio / 1000).toFixed(1)}k</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar cliente..."
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="total_spent">Maior Gasto</option>
              <option value="total_purchases">Mais Compras</option>
              <option value="average_ticket">Maior Ticket Médio</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                onClick={() => setSelectedCliente(cliente)}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition hover:shadow-xl ${
                  selectedCliente?.id === cliente.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cliente.name}</h3>
                      <p className="text-sm text-gray-600">{cliente.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Compras</div>
                    <div className="font-bold text-purple-600">{cliente.total_purchases}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Total Gasto</div>
                    <div className="font-bold text-green-600">R$ {(cliente.total_spent / 1000).toFixed(1)}k</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Ticket Médio</div>
                    <div className="font-bold text-orange-600">R$ {(cliente.average_ticket / 1000).toFixed(1)}k</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Última compra: {new Date(cliente.last_purchase_date).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-8">
            {selectedCliente ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Compras de {selectedCliente.name}</h2>
                
                <div className="space-y-4">
                  {selectedCliente.purchases.map((purchase) => (
                    <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-lg text-green-600">R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(purchase.date).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {purchase.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Package className="w-4 h-4" />
                          {purchase.items_count} {purchase.items_count === 1 ? 'item' : 'itens'}
                        </div>
                        <div className="text-gray-600">{purchase.payment_method}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Selecione um cliente</h3>
                <p className="text-gray-600">Clique em um cliente para ver seu histórico de compras</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
