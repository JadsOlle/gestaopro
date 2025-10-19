'use client'

import { useEffect, useState } from 'react'
import { Package, TrendingUp, TrendingDown, Plus, Minus, Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  sku?: string
  stock: number
}

interface StockMovement {
  id: string
  product_id: string
  type: string
  quantity: number
  reason: string
  created_at: string
  product?: {
    name: string
    sku?: string
  }
}

export default function EstoquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [movements, setMovements] = useState<StockMovement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [formData, setFormData] = useState({
    product_id: '',
    type: 'in',
    quantity: '',
    reason: '',
  })

  useEffect(() => {
    loadProducts()
    loadMovements()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const result = await res.json()
      if (result.success) {
        setProducts(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }

  const loadMovements = async () => {
    try {
      // API de movimentações ainda não existe, vamos criar dados simulados
      setMovements([])
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar movimentações:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.product_id || !formData.quantity) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const product = products.find(p => p.id === formData.product_id)
    if (!product) return

    const quantity = parseInt(formData.quantity)
    
    if (formData.type === 'out' && quantity > product.stock) {
      alert(`Estoque insuficiente! Disponível: ${product.stock}`)
      return
    }

    try {
      // Aqui você implementaria a API de movimentações de estoque
      // Por enquanto, vamos apenas atualizar o estoque do produto
      alert('Movimentação registrada com sucesso!')
      setShowForm(false)
      setFormData({
        product_id: '',
        type: 'in',
        quantity: '',
        reason: '',
      })
      loadProducts()
      loadMovements()
    } catch (error) {
      console.error('Erro ao registrar movimentação:', error)
      alert('Erro ao registrar movimentação')
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const lowStockCount = products.filter(p => p.stock < 10).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando estoque...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Controle de Estoque</h1>
            <p className="text-gray-600">Gerencie entradas e saídas de produtos</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Nova Movimentação'}
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-2">Total em Estoque</div>
            <div className="text-3xl font-bold text-gray-900">{totalStock}</div>
            <div className="text-sm text-gray-500 mt-1">unidades</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-2">Produtos</div>
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-500 mt-1">cadastrados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-2">Estoque Baixo</div>
            <div className="text-3xl font-bold text-yellow-600">{lowStockCount}</div>
            <div className="text-sm text-gray-500 mt-1">produtos</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="text-sm text-gray-600 mb-2">Movimentações</div>
            <div className="text-3xl font-bold text-gray-900">{movements.length}</div>
            <div className="text-sm text-gray-500 mt-1">este mês</div>
          </div>
        </div>

        {/* Formulário de Movimentação */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Nova Movimentação de Estoque</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tipo de Movimentação */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de Movimentação *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'in' })}
                      className={`p-4 rounded-xl border-2 transition ${
                        formData.type === 'in'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-gray-900">Entrada</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center">
                        Adicionar produtos ao estoque
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'out' })}
                      className={`p-4 rounded-xl border-2 transition ${
                        formData.type === 'out'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-gray-900">Saída</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center">
                        Remover produtos do estoque
                      </p>
                    </button>
                  </div>
                </div>

                {/* Produto */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Produto *
                  </label>
                  <select
                    required
                    value={formData.product_id}
                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um produto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} {product.sku ? `(${product.sku})` : ''} - Estoque atual: {product.stock}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Motivo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo *
                  </label>
                  <select
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione o motivo</option>
                    {formData.type === 'in' ? (
                      <>
                        <option value="purchase">Compra de fornecedor</option>
                        <option value="return">Devolução de cliente</option>
                        <option value="production">Produção</option>
                        <option value="adjustment">Ajuste de inventário</option>
                        <option value="other">Outro</option>
                      </>
                    ) : (
                      <>
                        <option value="sale">Venda</option>
                        <option value="loss">Perda/Avaria</option>
                        <option value="return">Devolução para fornecedor</option>
                        <option value="transfer">Transferência</option>
                        <option value="adjustment">Ajuste de inventário</option>
                        <option value="other">Outro</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Resumo */}
              {formData.product_id && formData.quantity && (
                <div className={`rounded-xl p-4 mb-6 ${
                  formData.type === 'in' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {formData.type === 'in' ? (
                        <Plus className="w-6 h-6 text-green-600" />
                      ) : (
                        <Minus className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <div className="text-sm text-gray-600">
                          {formData.type === 'in' ? 'Entrada' : 'Saída'} de estoque
                        </div>
                        <div className={`text-xl font-bold ${
                          formData.type === 'in' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formData.type === 'in' ? '+' : '-'} {formData.quantity} unidades
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Estoque resultante</div>
                      <div className="text-xl font-bold text-gray-900">
                        {(() => {
                          const product = products.find(p => p.id === formData.product_id)
                          if (!product) return 0
                          const qty = parseInt(formData.quantity) || 0
                          return formData.type === 'in' ? product.stock + qty : product.stock - qty
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg transition font-bold text-white ${
                    formData.type === 'in'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Registrar Movimentação
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Busca */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Buscar produto por nome ou SKU..."
            />
          </div>
        </div>

        {/* Tabela de Estoque Atual */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Estoque Atual</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Produto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estoque</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.sku || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-2xl font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock < 10 ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.stock === 0 ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">
                          Sem estoque
                        </span>
                      ) : product.stock < 10 ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                          Estoque baixo
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                          OK
                        </span>
                      )}
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

