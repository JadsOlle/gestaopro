'use client'

import { useEffect, useState } from 'react'
import { Users, TrendingUp, DollarSign, Award, Target, Filter } from 'lucide-react'

interface Segmento {
  id: string
  name: string
  description: string
  client_count: number
  total_revenue: number
  average_ticket: number
  color: string
  criteria: string
}

export default function SegmentacaoPage() {
  const [segmentos, setSegmentos] = useState<Segmento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSegmentos()
  }, [])

  const loadSegmentos = async () => {
    try {
      const mockData: Segmento[] = [
        {
          id: '1',
          name: 'VIP',
          description: 'Clientes com alto valor de compra',
          client_count: 12,
          total_revenue: 450000,
          average_ticket: 3750,
          color: 'purple',
          criteria: 'Gasto total > R$ 30.000',
        },
        {
          id: '2',
          name: 'Recorrentes',
          description: 'Compram regularmente',
          client_count: 28,
          total_revenue: 320000,
          average_ticket: 1900,
          color: 'blue',
          criteria: 'Mais de 10 compras',
        },
        {
          id: '3',
          name: 'Novos',
          description: 'Clientes recentes',
          client_count: 45,
          total_revenue: 180000,
          average_ticket: 1200,
          color: 'green',
          criteria: 'Primeira compra há menos de 30 dias',
        },
        {
          id: '4',
          name: 'Inativos',
          description: 'Sem compras recentes',
          client_count: 18,
          total_revenue: 95000,
          average_ticket: 1800,
          color: 'orange',
          criteria: 'Última compra há mais de 90 dias',
        },
        {
          id: '5',
          name: 'Potenciais',
          description: 'Com potencial de crescimento',
          client_count: 32,
          total_revenue: 220000,
          average_ticket: 2100,
          color: 'cyan',
          criteria: 'Ticket médio crescente',
        },
      ]
      setSegmentos(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar segmentos:', error)
      setLoading(false)
    }
  }

  const getColorClasses = (color: string) => {
    const colors: any = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-800', icon: 'bg-purple-100' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-800', icon: 'bg-blue-100' },
      green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600', badge: 'bg-green-100 text-green-800', icon: 'bg-green-100' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-800', icon: 'bg-orange-100' },
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600', badge: 'bg-cyan-100 text-cyan-800', icon: 'bg-cyan-100' },
    }
    return colors[color] || colors.blue
  }

  const totalClientes = segmentos.reduce((sum, s) => sum + s.client_count, 0)
  const totalReceita = segmentos.reduce((sum, s) => sum + s.total_revenue, 0)
  const ticketMedioGeral = totalReceita / totalClientes || 0

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Carregando...</div></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Segmentação de Clientes</h1>
          <p className="text-gray-600">Organize seus clientes em segmentos estratégicos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Clientes</div>
            <div className="text-3xl font-bold text-blue-600">{totalClientes}</div>
            <div className="text-sm text-gray-500 mt-1">Em {segmentos.length} segmentos</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Receita Total</div>
            <div className="text-3xl font-bold text-green-600">R$ {(totalReceita / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-500 mt-1">Todos os segmentos</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Ticket Médio Geral</div>
            <div className="text-3xl font-bold text-purple-600">R$ {(ticketMedioGeral / 1000).toFixed(1)}k</div>
            <div className="text-sm text-gray-500 mt-1">Por cliente</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Segmentos Ativos</div>
            <div className="text-3xl font-bold text-orange-600">{segmentos.length}</div>
            <div className="text-sm text-gray-500 mt-1">Configurados</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segmentos.map((segmento) => {
            const colors = getColorClasses(segmento.color)
            const percentualClientes = (segmento.client_count / totalClientes) * 100
            const percentualReceita = (segmento.total_revenue / totalReceita) * 100

            return (
              <div key={segmento.id} className={`rounded-xl shadow-lg p-6 border-l-4 ${colors.border} ${colors.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colors.icon}`}>
                      <Award className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{segmento.name}</h3>
                      <p className="text-sm text-gray-600">{segmento.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Critério:</span> {segmento.criteria}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Clientes</div>
                    <div className={`text-2xl font-bold ${colors.text}`}>{segmento.client_count}</div>
                    <div className="text-xs text-gray-500">{percentualClientes.toFixed(1)}% do total</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Receita</div>
                    <div className="text-2xl font-bold text-green-600">R$ {(segmento.total_revenue / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-gray-500">{percentualReceita.toFixed(1)}% do total</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Ticket Médio</div>
                    <div className="text-2xl font-bold text-orange-600">R$ {(segmento.average_ticket / 1000).toFixed(1)}k</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button className={`flex-1 ${colors.badge} px-4 py-2 rounded-lg font-medium text-sm hover:opacity-80 transition`}>
                      Ver Clientes
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition">
                      Exportar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
