'use client'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, TrendingUp, Award, DollarSign, Download } from 'lucide-react'

export default function RelatorioClientesPage() {
  const clientesPorSegmento = [
    { name: 'VIP', value: 12, color: '#8B5CF6' },
    { name: 'Recorrentes', value: 28, color: '#3B82F6' },
    { name: 'Novos', value: 45, color: '#10B981' },
    { name: 'Inativos', value: 18, color: '#F59E0B' },
  ]

  const topClientes = [
    { name: 'Maria Santos', gasto: 68000, compras: 22 },
    { name: 'João Silva', gasto: 45000, compras: 15 },
    { name: 'Ana Paula', gasto: 52000, compras: 18 },
    { name: 'Pedro Costa', gasto: 38000, compras: 12 },
    { name: 'Carlos Oliveira', gasto: 32000, compras: 10 },
  ]

  const aquisicaoMensal = [
    { mes: 'Jul', novos: 12, inativos: 3 },
    { mes: 'Ago', novos: 15, inativos: 2 },
    { mes: 'Set', novos: 8, inativos: 5 },
    { mes: 'Out', novos: 18, inativos: 4 },
    { mes: 'Nov', novos: 14, inativos: 3 },
    { mes: 'Dez', novos: 20, inativos: 6 },
    { mes: 'Jan', novos: 22, inativos: 4 },
  ]

  const totalClientes = 135
  const clientesAtivos = 103
  const ticketMedio = 3245
  const taxaRetencao = 76.3

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatório de Clientes</h1>
            <p className="text-gray-600">Análise de base de clientes e comportamento</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Clientes</div>
            <div className="text-3xl font-bold text-blue-600">{totalClientes}</div>
            <div className="text-sm text-blue-600 mt-1">Cadastrados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Clientes Ativos</div>
            <div className="text-3xl font-bold text-green-600">{clientesAtivos}</div>
            <div className="text-sm text-green-600 mt-1">{((clientesAtivos / totalClientes) * 100).toFixed(0)}% do total</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Ticket Médio</div>
            <div className="text-3xl font-bold text-purple-600">R$ {ticketMedio.toLocaleString('pt-BR')}</div>
            <div className="text-sm text-purple-600 mt-1">Por cliente</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Taxa de Retenção</div>
            <div className="text-3xl font-bold text-orange-600">{taxaRetencao}%</div>
            <div className="text-sm text-orange-600 mt-1">Últimos 6 meses</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Clientes por Segmento</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={clientesPorSegmento} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} (${entry.value})`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {clientesPorSegmento.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Aquisição vs Churn</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aquisicaoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="novos" fill="#10B981" name="Novos Clientes" />
                <Bar dataKey="inativos" fill="#EF4444" name="Churn" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Top 5 Clientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Posição</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Cliente</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Compras</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-900">Total Gasto</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-900">Ticket Médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topClientes.map((cliente, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{cliente.name}</td>
                    <td className="px-6 py-4 text-center text-gray-900">{cliente.compras}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">R$ {cliente.gasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right text-gray-900">R$ {(cliente.gasto / cliente.compras).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
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
