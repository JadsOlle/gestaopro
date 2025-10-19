'use client'
import { useEffect, useState } from 'react'
import { ShoppingCart, DollarSign, Clock, CheckCircle, Search, Filter, Eye } from 'lucide-react'

interface Sale {
  id: string
  sale_number: number
  total_amount: number
  payment_method: string
  status: string
  created_at: string
  contact?: { name: string; phone: string }
  items?: Array<{ quantity: number; unit_price: number; product?: { name: string } }>
}

export default function VendasPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [filteredSales, setFilteredSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadSales()
  }, [])

  useEffect(() => {
    filterSales()
  }, [sales, filter, searchTerm])

  const loadSales = async () => {
    try {
      const res = await fetch('/api/sales')
      const result = await res.json()
      if (result.success) {
        setSales(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar vendas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterSales = () => {
    let filtered = sales
    if (filter !== 'all') {
      filtered = filtered.filter(s => s.status === filter)
    }
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.sale_number.toString().includes(searchTerm) ||
        s.contact?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredSales(filtered)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    const labels = { paid: 'Paga', pending: 'Pendente', cancelled: 'Cancelada' }
    return (
      <span className={`px-3 py-1 text-sm rounded-full font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  const totalVendido = filteredSales.reduce((sum, s) => sum + s.total_amount, 0)
  const vendasPagas = filteredSales.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.total_amount, 0)
  const vendasPendentes = filteredSales.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.total_amount, 0)

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Carregando...</div></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Histórico de Vendas</h1>
            <p className="text-gray-600">Gerencie e acompanhe todas as vendas</p>
          </div>
          <a href="/vendas/nova" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
            Nova Venda
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Vendido</div>
            <div className="text-3xl font-bold text-green-600">R$ {totalVendido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-gray-500 mt-1">{filteredSales.length} vendas</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Vendas Pagas</div>
            <div className="text-3xl font-bold text-blue-600">R$ {vendasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-gray-500 mt-1">{sales.filter(s => s.status === 'paid').length} vendas</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Vendas Pendentes</div>
            <div className="text-3xl font-bold text-orange-600">R$ {vendasPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="text-sm text-gray-500 mt-1">{sales.filter(s => s.status === 'pending').length} vendas</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar por número ou cliente..."
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setFilter('all')} className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <Filter className="w-4 h-4" />
                Todas
              </button>
              <button onClick={() => setFilter('paid')} className={`px-4 py-3 rounded-lg font-medium transition ${filter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Pagas
              </button>
              <button onClick={() => setFilter('pending')} className={`px-4 py-3 rounded-lg font-medium transition ${filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Pendentes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">#</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cliente</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Itens</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Valor</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Pagamento</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Data</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-bold text-gray-900">#{sale.sale_number}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{sale.contact?.name || 'Cliente não informado'}</div>
                      {sale.contact?.phone && <div className="text-sm text-gray-600">{sale.contact.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{sale.items?.length || 0}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">R$ {sale.total_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{sale.payment_method}</td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(sale.status)}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">{new Date(sale.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Ver detalhes">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma venda encontrada</h3>
              <p className="text-gray-600">{searchTerm || filter !== 'all' ? 'Tente ajustar os filtros de busca.' : 'Clique em "Nova Venda" para começar.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
