'use client'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Package, TrendingDown, AlertTriangle, BarChart3, Download } from 'lucide-react'

export default function RelatorioEstoquePage() {
  const movimentacoes = [
    { mes: 'Jul', entradas: 450, saidas: 380 },
    { mes: 'Ago', entradas: 520, saidas: 410 },
    { mes: 'Set', entradas: 380, saidas: 450 },
    { mes: 'Out', entradas: 600, saidas: 420 },
    { mes: 'Nov', entradas: 480, saidas: 390 },
    { mes: 'Dez', entradas: 550, saidas: 480 },
    { mes: 'Jan', entradas: 620, saidas: 510 },
  ]

  const produtosBaixoEstoque = [
    { name: 'Teclado Mecânico', estoque: 5, minimo: 10 },
    { name: 'Webcam Logitech', estoque: 3, minimo: 8 },
    { name: 'Mouse Gamer', estoque: 7, minimo: 15 },
    { name: 'Memória RAM 16GB', estoque: 12, minimo: 20 },
    { name: 'SSD 1TB', estoque: 8, minimo: 15 },
  ]

  const giroEstoque = [
    { produto: 'Mouse Logitech', giro: 8.5 },
    { produto: 'Teclado Mecânico', giro: 6.2 },
    { produto: 'Headset HyperX', giro: 5.8 },
    { produto: 'Webcam Logitech', giro: 4.5 },
    { produto: 'Monitor LG 27"', giro: 3.2 },
  ]

  const totalProdutos = 245
  const valorEstoque = 485000
  const produtosBaixos = 12
  const semEstoque = 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatório de Estoque</h1>
            <p className="text-gray-600">Análise de movimentações e níveis de estoque</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Produtos</div>
            <div className="text-3xl font-bold text-blue-600">{totalProdutos}</div>
            <div className="text-sm text-blue-600 mt-1">Cadastrados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Valor do Estoque</div>
            <div className="text-3xl font-bold text-green-600">R$ {(valorEstoque / 1000).toFixed(0)}k</div>
            <div className="text-sm text-green-600 mt-1">Total investido</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Estoque Baixo</div>
            <div className="text-3xl font-bold text-orange-600">{produtosBaixos}</div>
            <div className="text-sm text-orange-600 mt-1">Produtos</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Sem Estoque</div>
            <div className="text-3xl font-bold text-red-600">{semEstoque}</div>
            <div className="text-sm text-red-600 mt-1">Produtos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Movimentações de Estoque</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={movimentacoes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entradas" fill="#10B981" name="Entradas" />
                <Bar dataKey="saidas" fill="#EF4444" name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Giro de Estoque</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={giroEstoque} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="produto" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="giro" fill="#8B5CF6" name="Giro (vezes/mês)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Produtos com Estoque Baixo</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Produto</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Estoque Atual</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Estoque Mínimo</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Diferença</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {produtosBaixoEstoque.map((produto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{produto.name}</td>
                    <td className="px-6 py-4 text-center text-gray-900">{produto.estoque}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{produto.minimo}</td>
                    <td className="px-6 py-4 text-center text-red-600 font-bold">-{produto.minimo - produto.estoque}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Crítico
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
