'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FileText, TrendingUp, Calendar, Download } from 'lucide-react'

export default function RelatoriosPage() {
  const [period, setPeriod] = useState('month')
  const [reportType, setReportType] = useState('sales')

  // Dados simulados - em produção viriam da API
  const salesByDay = [
    { day: 'Seg', vendas: 12, receita: 1200 },
    { day: 'Ter', vendas: 19, receita: 1900 },
    { day: 'Qua', vendas: 15, receita: 1500 },
    { day: 'Qui', vendas: 25, receita: 2500 },
    { day: 'Sex', vendas: 30, receita: 3000 },
    { day: 'Sáb', vendas: 35, receita: 3500 },
    { day: 'Dom', vendas: 20, receita: 2000 },
  ]

  const topProducts = [
    { name: 'Açaí 500ml', vendas: 45, receita: 675 },
    { name: 'Suco Natural', vendas: 38, receita: 380 },
    { name: 'Tapioca', vendas: 32, receita: 480 },
    { name: 'Vitamina', vendas: 28, receita: 420 },
    { name: 'Outros', vendas: 57, receita: 855 },
  ]

  const paymentMethods = [
    { name: 'PIX', value: 45 },
    { name: 'Cartão Crédito', value: 30 },
    { name: 'Cartão Débito', value: 15 },
    { name: 'Dinheiro', value: 10 },
  ]

  const monthlyComparison = [
    { month: 'Jan', atual: 4000, anterior: 3200 },
    { month: 'Fev', atual: 3000, anterior: 2800 },
    { month: 'Mar', atual: 2000, anterior: 2400 },
    { month: 'Abr', atual: 2780, anterior: 2600 },
    { month: 'Mai', atual: 1890, anterior: 2100 },
    { month: 'Jun', atual: 2390, anterior: 2000 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Análises detalhadas do seu negócio</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Relatório
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sales">Vendas</option>
                <option value="financial">Financeiro</option>
                <option value="products">Produtos</option>
                <option value="customers">Clientes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Ano</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-2">Receita Total</div>
            <div className="text-3xl font-bold text-gray-900">R$ 15.810</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% vs período anterior
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-2">Total de Vendas</div>
            <div className="text-3xl font-bold text-gray-900">200</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.2% vs período anterior
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="text-sm text-gray-600 mb-2">Ticket Médio</div>
            <div className="text-3xl font-bold text-gray-900">R$ 79,05</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +4.1% vs período anterior
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="text-sm text-gray-600 mb-2">Novos Clientes</div>
            <div className="text-3xl font-bold text-gray-900">47</div>
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3% vs período anterior
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Vendas por Dia */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Vendas por Dia da Semana</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="vendas" fill="#3b82f6" name="Vendas" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Formas de Pagamento */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Formas de Pagamento</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top 5 Produtos Mais Vendidos</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.vendas} unidades vendidas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">R$ {product.receita.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparação Mensal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Comparação Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="atual" stroke="#3b82f6" strokeWidth={2} name="Mês Atual" />
                <Line type="monotone" dataKey="anterior" stroke="#94a3b8" strokeWidth={2} name="Mês Anterior" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Insights do Período</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Sexta-feira e Sábado são os dias com maior volume de vendas</li>
                <li>• PIX é a forma de pagamento preferida (45% das transações)</li>
                <li>• Açaí 500ml é o produto mais vendido com 45 unidades</li>
                <li>• Houve um crescimento de 12.5% na receita em relação ao período anterior</li>
                <li>• 47 novos clientes foram cadastrados neste período</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

