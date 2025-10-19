'use client'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ShoppingCart, TrendingUp, Package, Users, Download } from 'lucide-react'

export default function RelatorioVendasPage() {
  const vendasMensais = [
    { mes: 'Jul', vendas: 85000, quantidade: 142 },
    { mes: 'Ago', vendas: 92000, quantidade: 156 },
    { mes: 'Set', vendas: 78000, quantidade: 128 },
    { mes: 'Out', vendas: 105000, quantidade: 175 },
    { mes: 'Nov', vendas: 98000, quantidade: 164 },
    { mes: 'Dez', vendas: 115000, quantidade: 192 },
    { mes: 'Jan', vendas: 125000, quantidade: 208 },
  ]

  const produtosMaisVendidos = [
    { name: 'Notebook Dell', vendas: 45000, quantidade: 15 },
    { name: 'Mouse Logitech', vendas: 12000, quantidade: 120 },
    { name: 'Teclado Mecânico', vendas: 18000, quantidade: 60 },
    { name: 'Monitor LG 27"', vendas: 32000, quantidade: 40 },
    { name: 'Headset HyperX', vendas: 18000, quantidade: 72 },
  ]

  const formasPagamento = [
    { name: 'Cartão', value: 45, color: '#3B82F6' },
    { name: 'PIX', value: 30, color: '#10B981' },
    { name: 'Boleto', value: 15, color: '#F59E0B' },
    { name: 'Dinheiro', value: 10, color: '#8B5CF6' },
  ]

  const totalVendas = 698000
  const ticketMedio = 3356
  const totalProdutos = 1165
  const taxaConversao = 68.5

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatório de Vendas</h1>
            <p className="text-gray-600">Análise completa de vendas e desempenho</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Vendas</div>
            <div className="text-3xl font-bold text-green-600">R$ {(totalVendas / 1000).toFixed(0)}k</div>
            <div className="text-sm text-green-600 mt-1">+15.2% vs mês anterior</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Ticket Médio</div>
            <div className="text-3xl font-bold text-blue-600">R$ {ticketMedio.toLocaleString('pt-BR')}</div>
            <div className="text-sm text-blue-600 mt-1">+8.3% vs mês anterior</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Produtos Vendidos</div>
            <div className="text-3xl font-bold text-purple-600">{totalProdutos}</div>
            <div className="text-sm text-purple-600 mt-1">Unidades</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Taxa de Conversão</div>
            <div className="text-3xl font-bold text-orange-600">{taxaConversao}%</div>
            <div className="text-sm text-orange-600 mt-1">+3.2% vs mês anterior</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Evolução de Vendas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#10B981" strokeWidth={3} name="Faturamento" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Formas de Pagamento</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={formasPagamento} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} (${entry.value}%)`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {formasPagamento.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Top 5 Produtos Mais Vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={produtosMaisVendidos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Bar dataKey="vendas" fill="#8B5CF6" name="Faturamento" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
