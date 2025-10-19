'use client'

import { useEffect, useState } from 'react'

interface DashboardData {
  sales: {
    total: number
    paid: number
    pending: number
    count: number
  }
  products: {
    total: number
    lowStock: number
  }
  customers: {
    total: number
  }
}

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sistema de Gestão</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card: Total de Vendas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total de Vendas</div>
            <div className="text-3xl font-bold text-green-600">
              R$ {data?.sales.total.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {data?.sales.count || 0} vendas
            </div>
          </div>

          {/* Card: Vendas Pagas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Vendas Pagas</div>
            <div className="text-3xl font-bold text-blue-600">
              R$ {data?.sales.paid.toFixed(2) || '0.00'}
            </div>
          </div>

          {/* Card: Vendas Pendentes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Vendas Pendentes</div>
            <div className="text-3xl font-bold text-orange-600">
              R$ {data?.sales.pending.toFixed(2) || '0.00'}
            </div>
          </div>

          {/* Card: Produtos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Produtos</div>
            <div className="text-3xl font-bold text-purple-600">
              {data?.products.total || 0}
            </div>
            {data && data.products.lowStock > 0 && (
              <div className="text-sm text-red-500 mt-2">
                ⚠️ {data.products.lowStock} com estoque baixo
              </div>
            )}
          </div>
        </div>

        {/* Seção de Ações Rápidas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/api/products"
              target="_blank"
              className="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition text-center"
            >
              <div className="text-lg font-semibold text-blue-600">📦 Ver Produtos</div>
              <div className="text-sm text-gray-600 mt-1">API: GET /api/products</div>
            </a>

            <a
              href="/api/sales"
              target="_blank"
              className="p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition text-center"
            >
              <div className="text-lg font-semibold text-green-600">💰 Ver Vendas</div>
              <div className="text-sm text-gray-600 mt-1">API: GET /api/sales</div>
            </a>

            <a
              href="/api/dashboard"
              target="_blank"
              className="p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition text-center"
            >
              <div className="text-lg font-semibold text-purple-600">📊 Dashboard API</div>
              <div className="text-sm text-gray-600 mt-1">API: GET /api/dashboard</div>
            </a>
          </div>
        </div>

        {/* Documentação das APIs */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">📚 Documentação das APIs</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg">Produtos</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">GET /api/products</code>
              <p className="text-sm text-gray-600 mt-1">Listar todos os produtos</p>
              
              <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-2 block">POST /api/products</code>
              <p className="text-sm text-gray-600 mt-1">Criar novo produto</p>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
{`{
  "name": "Açaí 500ml",
  "sell_price": 15.00,
  "stock": 50,
  "attributes": {
    "size": "500ml",
    "flavor": "Açaí"
  }
}`}
              </pre>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg">Vendas</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">GET /api/sales</code>
              <p className="text-sm text-gray-600 mt-1">Listar todas as vendas</p>
              
              <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-2 block">POST /api/sales</code>
              <p className="text-sm text-gray-600 mt-1">Criar nova venda</p>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
{`{
  "contact_name": "João Silva",
  "contact_phone": "11999999999",
  "total_amount": 30.00,
  "payment_method": "pix",
  "status": "paid",
  "items": [
    {
      "product_id": "uuid-do-produto",
      "quantity": 2,
      "unit_price": 15.00,
      "total_price": 30.00
    }
  ]
}`}
              </pre>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg">Dashboard</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">GET /api/dashboard</code>
              <p className="text-sm text-gray-600 mt-1">Obter estatísticas gerais</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

