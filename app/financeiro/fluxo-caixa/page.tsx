'use client'

import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'

export default function FluxoCaixaPage() {
  const [period, setPeriod] = useState('month')

  // Dados simulados - em produção viriam da API
  const cashFlowData = [
    { day: '01', entradas: 1200, saidas: 800, saldo: 400 },
    { day: '05', entradas: 1500, saidas: 900, saldo: 1000 },
    { day: '10', entradas: 2000, saidas: 1200, saldo: 1800 },
    { day: '15', entradas: 1800, saidas: 1500, saldo: 2100 },
    { day: '20', entradas: 2200, saidas: 1100, saldo: 3200 },
    { day: '25', entradas: 1900, saidas: 1300, saldo: 3800 },
    { day: '30', entradas: 2500, saidas: 1600, saldo: 4700 },
  ]

  const projectionData = [
    { month: 'Jan', real: 4700, projetado: 4700 },
    { month: 'Fev', real: null, projetado: 5200 },
    { month: 'Mar', real: null, projetado: 5800 },
    { month: 'Abr', real: null, projetado: 6200 },
    { month: 'Mai', real: null, projetado: 6800 },
    { month: 'Jun', real: null, projetado: 7200 },
  ]

  const totalEntradas = cashFlowData.reduce((acc, item) => acc + item.entradas, 0)
  const totalSaidas = cashFlowData.reduce((acc, item) => acc + item.saidas, 0)
  const saldoFinal = totalEntradas - totalSaidas

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Fluxo de Caixa</h1>
            <p className="text-gray-600">Controle de entradas e saídas financeiras</p>
          </div>
          <div className="flex gap-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Entradas</div>
            <div className="text-3xl font-bold text-green-600">
              R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Saídas</div>
            <div className="text-3xl font-bold text-red-600">
              R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Saldo do Período</div>
            <div className={`text-3xl font-bold ${saldoFinal >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              R$ {saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Saldo Projetado</div>
            <div className="text-3xl font-bold text-purple-600">
              R$ 7.200,00
            </div>
          </div>
        </div>

        {/* Gráfico de Fluxo de Caixa */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Evolução do Fluxo de Caixa</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              />
              <Legend />
              <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas" />
              <Line type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={2} name="Saídas" />
              <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={3} name="Saldo" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projeção Futura */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projeção de Saldo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => value ? `R$ ${value.toFixed(2)}` : 'N/A'}
              />
              <Legend />
              <Bar dataKey="real" fill="#3b82f6" name="Saldo Real" radius={[8, 8, 0, 0]} />
              <Bar dataKey="projetado" fill="#94a3b8" name="Saldo Projetado" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela de Movimentações */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Movimentações Detalhadas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Data</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Entradas</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Saídas</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cashFlowData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.day}/01/2025</td>
                    <td className="px-6 py-4 text-green-600 font-bold">
                      + R$ {item.entradas.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      - R$ {item.saidas.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-blue-600 font-bold text-lg">
                      R$ {item.saldo.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

