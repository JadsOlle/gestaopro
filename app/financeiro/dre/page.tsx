'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Percent, FileText } from 'lucide-react'

export default function DREPage() {
  const [period, setPeriod] = useState('month')

  // Dados simulados - em produção viriam da API
  const dreData = {
    receita_bruta: 50000,
    deducoes: 7500, // impostos sobre vendas
    receita_liquida: 42500,
    custo_mercadorias: 25000,
    lucro_bruto: 17500,
    despesas_operacionais: {
      vendas: 3000,
      administrativas: 4000,
      financeiras: 1000,
      total: 8000,
    },
    lucro_operacional: 9500,
    outras_receitas: 500,
    outras_despesas: 300,
    lucro_antes_impostos: 9700,
    impostos_renda: 1455, // 15%
    lucro_liquido: 8245,
  }

  const despesasData = [
    { name: 'Vendas', value: 3000, color: '#3b82f6' },
    { name: 'Administrativas', value: 4000, color: '#10b981' },
    { name: 'Financeiras', value: 1000, color: '#f59e0b' },
  ]

  const comparativoData = [
    { month: 'Jan', receita: 42500, despesas: 33000, lucro: 9500 },
    { month: 'Fev', receita: 38000, despesas: 30000, lucro: 8000 },
    { month: 'Mar', receita: 45000, despesas: 34000, lucro: 11000 },
    { month: 'Abr', receita: 48000, despesas: 36000, lucro: 12000 },
    { month: 'Mai', receita: 42500, despesas: 33000, lucro: 9500 },
    { month: 'Jun', receita: 50000, despesas: 35000, lucro: 15000 },
  ]

  const margemBruta = (dreData.lucro_bruto / dreData.receita_liquida) * 100
  const margemOperacional = (dreData.lucro_operacional / dreData.receita_liquida) * 100
  const margemLiquida = (dreData.lucro_liquido / dreData.receita_liquida) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">DRE - Demonstração do Resultado</h1>
            <p className="text-gray-600">Análise completa de receitas, despesas e lucros</p>
          </div>
          <div className="flex gap-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Cards de Margens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">{margemBruta.toFixed(1)}%</div>
            </div>
            <div className="text-sm text-gray-600">Margem Bruta</div>
            <div className="text-xs text-gray-500 mt-1">Lucro Bruto / Receita Líquida</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600">{margemOperacional.toFixed(1)}%</div>
            </div>
            <div className="text-sm text-gray-600">Margem Operacional</div>
            <div className="text-xs text-gray-500 mt-1">Lucro Operacional / Receita Líquida</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600">{margemLiquida.toFixed(1)}%</div>
            </div>
            <div className="text-sm text-gray-600">Margem Líquida</div>
            <div className="text-xs text-gray-500 mt-1">Lucro Líquido / Receita Líquida</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* DRE Detalhado */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Demonstração do Resultado</h2>
            
            <div className="space-y-4">
              {/* Receita Bruta */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900">Receita Bruta</span>
                  <span className="text-xl font-bold text-gray-900">
                    R$ {dreData.receita_bruta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Deduções */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">(-) Deduções (Impostos sobre vendas)</span>
                  <span className="text-lg font-medium text-red-600">
                    R$ {dreData.deducoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Receita Líquida */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900">(=) Receita Líquida</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {dreData.receita_liquida.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* CMV */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">(-) Custo das Mercadorias Vendidas (CMV)</span>
                  <span className="text-lg font-medium text-red-600">
                    R$ {dreData.custo_mercadorias.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Lucro Bruto */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-900">(=) Lucro Bruto</span>
                  <span className="text-2xl font-bold text-green-600">
                    R$ {dreData.lucro_bruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Margem: {margemBruta.toFixed(1)}%
                </div>
              </div>

              {/* Despesas Operacionais */}
              <div className="border-b pb-4">
                <div className="font-bold text-gray-900 mb-3">(-) Despesas Operacionais</div>
                <div className="space-y-2 ml-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Despesas com Vendas</span>
                    <span className="font-medium text-gray-900">
                      R$ {dreData.despesas_operacionais.vendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Despesas Administrativas</span>
                    <span className="font-medium text-gray-900">
                      R$ {dreData.despesas_operacionais.administrativas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Despesas Financeiras</span>
                    <span className="font-medium text-gray-900">
                      R$ {dreData.despesas_operacionais.financeiras.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="text-lg font-bold text-red-600">
                      R$ {dreData.despesas_operacionais.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lucro Operacional */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900">(=) Lucro Operacional (EBIT)</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {dreData.lucro_operacional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  Margem: {margemOperacional.toFixed(1)}%
                </div>
              </div>

              {/* Outras Receitas/Despesas */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">(+) Outras Receitas</span>
                  <span className="font-medium text-green-600">
                    R$ {dreData.outras_receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">(-) Outras Despesas</span>
                  <span className="font-medium text-red-600">
                    R$ {dreData.outras_despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Lucro Antes dos Impostos */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">(=) Lucro Antes dos Impostos</span>
                  <span className="text-xl font-bold text-gray-900">
                    R$ {dreData.lucro_antes_impostos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Impostos */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">(-) Impostos sobre o Lucro (IR/CSLL)</span>
                  <span className="text-lg font-medium text-red-600">
                    R$ {dreData.impostos_renda.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Lucro Líquido */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-500">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-900">(=) LUCRO LÍQUIDO</span>
                  <span className="text-4xl font-bold text-purple-600">
                    R$ {dreData.lucro_liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-sm text-purple-700 mt-2">
                  Margem Líquida: {margemLiquida.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="space-y-6">
            {/* Composição das Despesas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Despesas Operacionais</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={despesasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {despesasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Indicadores */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Indicadores</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">ROL (Return on Sales)</span>
                  <span className="font-bold text-green-600">{margemLiquida.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Lucro por Real Vendido</span>
                  <span className="font-bold text-green-600">
                    R$ {(dreData.lucro_liquido / dreData.receita_liquida).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Ponto de Equilíbrio</span>
                  <span className="font-bold text-blue-600">R$ 33.000,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparativo Mensal */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Evolução Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              />
              <Legend />
              <Bar dataKey="receita" fill="#3b82f6" name="Receita" radius={[8, 8, 0, 0]} />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lucro" fill="#10b981" name="Lucro" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

