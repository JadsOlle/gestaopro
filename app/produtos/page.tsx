'use client'

import { useEffect, useState } from 'react'
import { Package, Search, Filter, Edit, Trash2, AlertTriangle } from 'lucide-react'

interface Product {
  id: string
  name: string
  sku?: string
  category?: string
  sell_price: number
  cost_price?: number
  stock: number
  min_stock?: number
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    cost_price: '',
    sell_price: '',
    stock: '',
    min_stock: '',
    description: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, filterCategory])

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const result = await res.json()
      if (result.success) {
        setProducts(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCategory !== 'all') {
      if (filterCategory === 'low_stock') {
        filtered = filtered.filter(p => p.stock < (p.min_stock || 10))
      } else if (filterCategory === 'out_of_stock') {
        filtered = filtered.filter(p => p.stock === 0)
      } else {
        filtered = filtered.filter(p => p.category === filterCategory)
      }
    }

    setFilteredProducts(filtered)
  }

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku || undefined,
          category: formData.category || undefined,
          cost_price: formData.cost_price ? parseFloat(formData.cost_price) : undefined,
          sell_price: parseFloat(formData.sell_price),
          stock: parseInt(formData.stock) || 0,
          min_stock: formData.min_stock ? parseInt(formData.min_stock) : undefined,
          description: formData.description || undefined,
        }),
      })

      const result = await res.json()
      
      if (result.success) {
        alert('Produto criado com sucesso!')
        setShowForm(false)
        setFormData({
          name: '',
          sku: '',
          category: '',
          cost_price: '',
          sell_price: '',
          stock: '',
          min_stock: '',
          description: '',
        })
        loadProducts()
      } else {
        alert('Erro ao criar produto: ' + result.error)
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao criar produto')
    }
  }

  const lowStockCount = products.filter(p => p.stock < (p.min_stock || 10) && p.stock > 0).length
  const outOfStockCount = products.filter(p => p.stock === 0).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando produtos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Produtos</h1>
            <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Novo Produto'}
          </button>
        </div>

        {/* Alertas */}
        {(lowStockCount > 0 || outOfStockCount > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {outOfStockCount > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <div>
                    <div className="font-bold text-red-900">Produtos sem estoque</div>
                    <div className="text-sm text-red-700">{outOfStockCount} produtos precisam de reposição</div>
                  </div>
                </div>
              </div>
            )}
            
            {lowStockCount > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <div className="font-bold text-yellow-900">Estoque baixo</div>
                    <div className="text-sm text-yellow-700">{lowStockCount} produtos abaixo do mínimo</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Novo Produto</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Açaí 500ml"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU / Código</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: ACAI500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Açaí"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço de Custo</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço de Venda *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.sell_price}
                  onChange={(e) => setFormData({ ...formData, sell_price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estoque Inicial</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estoque Mínimo</label>
                <input
                  type="number"
                  value={formData.min_stock}
                  onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descrição detalhada do produto..."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Buscar por nome, SKU ou categoria..."
                />
              </div>
            </div>

            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                <option value="low_stock">⚠️ Estoque baixo</option>
                <option value="out_of_stock">🚫 Sem estoque</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-2">Total de Produtos</div>
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-2">Em Estoque</div>
            <div className="text-3xl font-bold text-green-600">
              {products.filter(p => p.stock > (p.min_stock || 10)).length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-2">Estoque Baixo</div>
            <div className="text-3xl font-bold text-yellow-600">{lowStockCount}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-2">Sem Estoque</div>
            <div className="text-3xl font-bold text-red-600">{outOfStockCount}</div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.sku || '-'}</td>
                    <td className="px-6 py-4">
                      {product.category ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
                          {product.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-600">R$ {product.sell_price.toFixed(2)}</div>
                      {product.cost_price && (
                        <div className="text-xs text-gray-500">Custo: R$ {product.cost_price.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock < (product.min_stock || 10) ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {product.stock}
                      </span>
                      {product.min_stock && (
                        <span className="text-xs text-gray-500 ml-1">/ {product.min_stock}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.stock === 0 ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">
                          Sem estoque
                        </span>
                      ) : product.stock < (product.min_stock || 10) ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                          Estoque baixo
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                          OK
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchTerm || filterCategory !== 'all' 
                ? 'Nenhum produto encontrado com os filtros aplicados.'
                : 'Nenhum produto cadastrado. Clique em "Novo Produto" para começar.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

