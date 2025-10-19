'use client'

import { useEffect, useState } from 'react'

interface Sale {
  id: string
  sale_number: number
  total_amount: number
  payment_method: string
  status: string
  created_at: string
  contact?: {
    name: string
    phone: string
  }
  items?: Array<{
    quantity: number
    unit_price: number
    product?: {
      name: string
    }
  }>
}

export default function VendasPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSales()
  }, [])

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

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      cancelled: 'Cancelado',
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      pix: 'PIX',
      credit_card: 'Cartão de Crédito',
      debit_card: 'Cartão de Débito',
      cash: 'Dinheiro',
      other: 'Outro',
    }
    return labels[method] || method
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando vendas...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <a
          href="/vendas/nova"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          + Nova Venda
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Total Vendido</div>
          <div className="text-3xl font-bold text-green-600">
            R$ {sales.reduce((acc, sale) => acc + sale.total_amount, 0).toFixed(2)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Vendas Pagas</div>
          <div className="text-3xl font-bold text-blue-600">
            R$ {sales.filter(s => s.status === 'paid').reduce((acc, sale) => acc + sale.total_amount, 0).toFixed(2)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-2">Vendas Pendentes</div>
          <div className="text-3xl font-bold text-orange-600">
            R$ {sales.filter(s => s.status === 'pending').reduce((acc, sale) => acc + sale.total_amount, 0).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Itens</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pagamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">#{sale.sale_number}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{sale.contact?.name || 'Cliente não informado'}</div>
                  {sale.contact?.phone && (
                    <div className="text-sm text-gray-500">{sale.contact.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {sale.items && sale.items.length > 0 ? (
                    <div className="text-sm">
                      {sale.items.map((item, idx) => (
                        <div key={idx}>
                          {item.quantity}x {item.product?.name || 'Produto'}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">
                  R$ {sale.total_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {getPaymentMethodLabel(sale.payment_method)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(sale.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(sale.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sales.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhuma venda registrada ainda.
          </div>
        )}
      </div>
    </div>
  )
}

