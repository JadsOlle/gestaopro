'use client'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, Percent, Award, Download } from 'lucide-react'

export default function RelatorioLucratividadePage() {
  const lucroMensal = [
    { mes: 'Jul', receita: 85000, custo: 45000, lucro: 40000 },
    { mes: 'Ago', receita: 92000, custo: 48000, lucro: 44000 },
    { mes: 'Set', receita: 78000, custo: 42000, lucro: 36000 },
    { mes: 'Out', receita: 105000, custo: 52000, lucro: 53000 },
    { mes: 'Nov', receita: 98000, custo: 49000, lucro: 49000 },
    { mes: 'Dez', receita: 115000, custo: 55000, lucro: 60000 },
    { mes: 'Jan', receita: 125000, custo: 58000, lucro: 67000 },
  ]

  const margemPorProduto = [
    { produto: 'Notebook Dell', margem: 35 },
    { produto: 'Monitor LG 27"', margem: 28 },
    { produto: 'Teclado Mecânico', margem: 42 },
    { produto: 'Mouse Logitech', margem: 38 },
    { produto: 'Headset HyperX', margem: 32 },
  ]

  const produtosMaisLucrativos = [
    { name: 'Notebook Dell', lucro: 15750, vendas: 45000 },
    { name: 'Monitor LG 27"', lucro: 8960, vendas: 32000 },
    { name: 'Teclado Mecânico', lucro: 7560, vendas: 18000 },
    { name: 'Mouse Logitech', lucro: 4560, vendas: 12000 },
    { name: 'Headset HyperX', lucro: 5760, vendas: 18000 },
  ]

  const receitaTotal = 698000
  const custoTotal = 349000
  const lucroTotal = 349000
  const margemMedia = 50

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatório de Lucratividade</h1>
            <p className="text-gray-600">Análise de margens e rentabilidade</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Receita Total</div>
            <div className="text-3xl font-bold text-green-600">R$ {(receitaTotal / 1000).toFixed(0)}k</div>
            <div className="text-sm text-green-600 mt-1">Período</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Custo Total</div>
            <div className="text-3xl font-bold text-red-600">R$ {(custoTotal / 1000).toFixed(0)}k</div>
            <div className="text-sm text-red-600 mt-1">Período</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Lucro Total</div>
            <div className="text-3xl font-bold text-blue-600">R$ {(lucroTotal / 1000).toFixed(0)}k</div>
            <div className="text-sm text-blue-600 mt-1">Período</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <Percent className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Margem Média</div>
            <div className="text-3xl font-bold text-purple-600">{margemMedia}%</div>
            <div className="text-sm text-purple-600 mt-1">Sobre vendas</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Evolução de Lucro</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lucroMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Line type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2} name="Receita" />
                <Line type="monotone" dataKey="custo" stroke="#EF4444" strokeWidth={2} name="Custo" />
                <Line type="monotone" dataKey="lucro" stroke="#3B82F6" strokeWidth={3} name="Lucro" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Margem por Produto</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={margemPorProduto} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="produto" type="category" width={150} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Bar dataKey="margem" fill="#8B5CF6" name="Margem (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Top 5 Produtos Mais Lucrativos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Produto</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-900">Vendas</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-900">Lucro</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Margem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {produtosMaisLucrativos.map((produto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{produto.name}</td>
                    <td className="px-6 py-4 text-right text-gray-900">R$ {produto.vendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">R$ {produto.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {((produto.lucro / produto.vendas) * 100).toFixed(1)}%
                      </span>
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
