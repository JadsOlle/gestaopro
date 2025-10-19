'use client'

import { useEffect, useState } from 'react'
import { Repeat, TrendingUp, Users, Calendar, Award, DollarSign } from 'lucide-react'

interface ClienteRecorrencia {
  id: string
  name: string
  email: string
  recurrence_rate: number
  days_between_purchases: number
  total_purchases: number
  total_spent: number
  last_purchase_date: string
  next_expected_purchase: string
  status: 'active' | 'at_risk' | 'inactive'
}

export default function RecorrenciaPage() {
  const [clientes, setClientes] = useState<ClienteRecorrencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      const mockData: ClienteRecorrencia[] = [
        {
          id: '1',
          name: 'Maria Santos',
          email: 'maria@email.com',
          recurrence_rate: 95,
          days_between_purchases: 15,
          total_purchases: 22,
          total_spent: 68000,
          last_purchase_date: '2025-01-18',
          next_expected_purchase: '2025-02-02',
          status: 'active',
        },
        {
          id: '2',
          name: 'João Silva',
          email: 'joao@email.com',
          recurrence_rate: 85,
          days_between_purchases: 20,
          total_purchases: 15,
          total_spent: 45000,
          last_purchase_date: '2025-01-15',
          next_expected_purchase: '2025-02-04',
          status: 'active',
        },
        {
          id: '3',
          name: 'Ana Paula',
          email: 'ana@email.com',
          recurrence_rate: 70,
          days_between_purchases: 25,
          total_purchases: 18,
          total_spent: 52000,
          last_purchase_date: '2025-01-16',
          next_expected_purchase: '2025-02-10',
          status: 'at_risk',
        },
        {
          id: '4',
          name: 'Carlos Oliveira',
          email: 'carlos@email.com',
          recurrence_rate: 45,
          days_between_purchases: 40,
          total_purchases: 8,
          total_spent: 18000,
          last_purchase_date: '2025-01-12',
          next_expected_purchase: '2025-02-21',
          status: 'at_risk',
        },
      ]
      setClientes(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar recorrência:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'at_risk':
        return 'bg-orange-100 text-orange-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'at_risk':
        return 'Em Risco'
      case 'inactive':
        return 'Inativo'
      default:
        return status
    }
  }

  const clientesAtivos = clientes.filter(c => c.status === 'active').length
  const clientesEmRisco = clientes.filter(c => c.status === 'at_risk').length
  const taxaRecorrenciaMedia = clientes.reduce((sum, c) => sum + c.recurrence_rate, 0) / clientes.length || 0
  const intervaloMedio = clientes.reduce((sum, c) => sum + c.days_between_purchases, 0) / clientes.length || 0

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Carregando...</div></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Análise de Recorrência</h1>
          <p className="text-gray-600">Identifique padrões de compra e clientes recorrentes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <Repeat className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Clientes Ativos</div>
            <div className="text-3xl font-bold text-green-600">{clientesAtivos}</div>
            <div className="text-sm text-gray-500 mt-1">Comprando regularmente</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Em Risco</div>
            <div className="text-3xl font-bold text-orange-600">{clientesEmRisco}</div>
            <div className="text-sm text-gray-500 mt-1">Requer atenção</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Taxa Média</div>
            <div className="text-3xl font-bold text-blue-600">{taxaRecorrenciaMedia.toFixed(0)}%</div>
            <div className="text-sm text-gray-500 mt-1">De recorrência</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Intervalo Médio</div>
            <div className="text-3xl font-bold text-purple-600">{intervaloMedio.toFixed(0)}</div>
            <div className="text-sm text-gray-500 mt-1">Dias entre compras</div>
          </div>
        </div>

        <div className="space-y-6">
          {clientes.map((cliente) => (
            <div key={cliente.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${
                    cliente.status === 'active' ? 'bg-green-100' :
                    cliente.status === 'at_risk' ? 'bg-orange-100' : 'bg-red-100'
                  }`}>
                    <Users className="w-8 h-8 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{cliente.name}</h3>
                    <p className="text-gray-600">{cliente.email}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-lg font-bold text-sm ${getStatusColor(cliente.status)}`}>
                  {getStatusLabel(cliente.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Taxa de Recorrência</div>
                  <div className="text-2xl font-bold text-blue-600">{cliente.recurrence_rate}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Intervalo Médio</div>
                  <div className="text-2xl font-bold text-purple-600">{cliente.days_between_purchases} dias</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Compras</div>
                  <div className="text-2xl font-bold text-gray-900">{cliente.total_purchases}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Gasto</div>
                  <div className="text-2xl font-bold text-green-600">R$ {(cliente.total_spent / 1000).toFixed(0)}k</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Próxima Compra Esperada</div>
                  <div className="text-lg font-bold text-orange-600">
                    {new Date(cliente.next_expected_purchase).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Última compra: {new Date(cliente.last_purchase_date).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
