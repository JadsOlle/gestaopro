'use client'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react'

export default function RelatorioFinanceiroPage() {
  const receitasDespesas = [
    { mes: 'Jul', receitas: 85000, despesas: 52000 },
    { mes: 'Ago', receitas: 92000, despesas: 48000 },
    { mes: 'Set', receitas: 78000, despesas: 55000 },
    { mes: 'Out', receitas: 105000, despesas: 51000 },
    { mes: 'Nov', receitas: 98000, despesas: 49000 },
    { mes: 'Dez', receitas: 115000, despesas: 53000 },
    { mes: 'Jan', receitas: 125000, despesas: 58000 },
  ]

  const categoriasDespesas = [
    { name: 'Fornecedores', value: 48000, color: '#EF4444' },
    { name: 'Pessoal', value: 102000, color: '#F59E0B' },
    { name: 'Aluguel', value: 24000, color: '#3B82F6' },
    { name: 'Marketing', value: 10800, color: '#8B5CF6' },
    { name: 'Utilidades', value: 12600, color: '#10B981' },
  ]

  const fluxoCaixa = [
    { mes: 'Jul', saldo: 33000 },
    { mes: 'Ago', saldo: 77000 },
    { mes: 'Set', saldo: 100000 },
    { mes: 'Out', saldo: 154000 },
    { mes: 'Nov', saldo: 203000 },
    { mes: 'Dez', saldo: 265000 },
    { mes: 'Jan', saldo: 332000 },
  ]

  const totalReceitas = 698000
  const totalDespesas = 366000
  const saldoAtual = 332000
  const lucroLiquido = totalReceitas - totalDespesas

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatório Financeiro</h1>
            <p className="text-gray-600">Análise completa de receitas, despesas e fluxo de caixa</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Receitas</div>
            <div className="text-3xl font-bold text-green-600">R$ {(totalReceitas / 1000).toFixed(0)}k</div>
            <div className="text-sm text-green-600 mt-1">+12.5% vs mês anterior</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="bg-red-100 p-3 rounded-lg w-fit mb-2">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Despesas</div>
            <div className="text-3xl font-bold text-red-600">R$ {(totalDespesas / 1000).toFixed(0)}k</div>
            <div className="text-sm text-red-600 mt-1">+5.2% vs mês anterior</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Lucro Líquido</div>
            <div className="text-3xl font-bold text-blue-600">R$ {(lucroLiquido / 1000).toFixed(0)}k</div>
            <div className="text-sm text-blue-600 mt-1">Margem: {((lucroLiquido / totalReceitas) * 100).toFixed(1)}%</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Saldo Atual</div>
            <div className="text-3xl font-bold text-purple-600">R$ {(saldoAtual / 1000).toFixed(0)}k</div>
            <div className="text-sm text-purple-600 mt-1">Em caixa</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Receitas vs Despesas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receitasDespesas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
                <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Despesas por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoriasDespesas} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={100} fill="#8884d8" dataKey="value">
                  {categoriasDespesas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Evolução do Fluxo de Caixa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fluxoCaixa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Line type="monotone" dataKey="saldo" stroke="#8B5CF6" strokeWidth={3} name="Saldo Acumulado" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
