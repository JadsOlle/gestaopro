'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, AlertTriangle } from 'lucide-react'

interface DashboardData {
  sales: {
    total: number
    paid: number
    pending: number
    count: number
  }
  products: {
    total: number
    lowStock: number
  }
  customers: {
    total: number
  }
}

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Dados simulados para gráficos (em produção viriam da API)
  const salesChartData = [
    { name: 'Jan', vendas: 4000, lucro: 2400 },
    { name: 'Fev', vendas: 3000, lucro: 1398 },
    { name: 'Mar', vendas: 2000, lucro: 9800 },
    { name: 'Abr', vendas: 2780, lucro: 3908 },
    { name: 'Mai', vendas: 1890, lucro: 4800 },
    { name: 'Jun', vendas: 2390, lucro: 3800 },
  ]

  const categoryData = [
    { name: 'Produtos', value: 400 },
    { name: 'Serviços', value: 300 },
    { name: 'Outros', value: 100 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu negócio em tempo real</p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Vendas */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              R$ {data?.sales.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
            </div>
            <div className="text-sm text-gray-600">Total de Vendas</div>
            <div className="mt-3 text-xs text-gray-500">
              {data?.sales.count || 0} vendas realizadas
            </div>
          </div>

          {/* Vendas Pagas */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              R$ {data?.sales.paid.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
            </div>
            <div className="text-sm text-gray-600">Vendas Pagas</div>
            <div className="mt-3 text-xs text-gray-500">
              Recebido este mês
            </div>
          </div>

          {/* Produtos */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              {data && data.products.lowStock > 0 && (
                <div className="flex items-center text-red-600 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {data.products.lowStock}
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {data?.products.total || 0}
            </div>
            <div className="text-sm text-gray-600">Produtos Cadastrados</div>
            {data && data.products.lowStock > 0 && (
              <div className="mt-3 text-xs text-red-500 font-medium">
                ⚠️ {data.products.lowStock} com estoque baixo
              </div>
            )}
          </div>

          {/* Clientes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {data?.customers.total || 0}
            </div>
            <div className="text-sm text-gray-600">Clientes Ativos</div>
            <div className="mt-3 text-xs text-gray-500">
              Cadastrados no sistema
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Vendas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Vendas nos Últimos Meses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} name="Vendas" />
                <Line type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={2} name="Lucro" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Categorias */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Vendas por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendas Pendentes */}
        {data && data.sales.pending > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Atenção: Vendas Pendentes</h3>
                <p className="text-gray-700 mb-2">
                  Você tem <span className="font-bold text-orange-600">
                    R$ {data.sales.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span> em vendas pendentes de pagamento.
                </p>
                <button className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium">
                  Ver Vendas Pendentes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/produtos"
              className="flex items-center p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition group"
            >
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Gerenciar Produtos</div>
                <div className="text-sm text-gray-600">Cadastrar e editar produtos</div>
              </div>
            </a>

            <a
              href="/vendas"
              className="flex items-center p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition group"
            >
              <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Ver Vendas</div>
                <div className="text-sm text-gray-600">Histórico de vendas</div>
              </div>
            </a>

            <a
              href="/transacoes"
              className="flex items-center p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition group"
            >
              <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Controle Financeiro</div>
                <div className="text-sm text-gray-600">Receitas e despesas</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

