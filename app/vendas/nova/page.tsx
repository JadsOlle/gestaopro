'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  sku?: string
  sell_price: number
  stock: number
}

interface SaleItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

export default function NovaVendaPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    payment_method: 'pix',
    status: 'pending',
    notes: '',
  })

  const [items, setItems] = useState<SaleItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProducts()
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

  const addItem = () => {
    if (!selectedProduct) {
      alert('Selecione um produto')
      return
    }

    const product = products.find(p => p.id === selectedProduct)
    if (!product) return

    if (quantity > product.stock) {
      alert(`Estoque insuficiente! Disponível: ${product.stock}`)
      return
    }

    const existingItem = items.find(i => i.product_id === selectedProduct)
    if (existingItem) {
      setItems(items.map(i => 
        i.product_id === selectedProduct
          ? { ...i, quantity: i.quantity + quantity, total_price: (i.quantity + quantity) * i.unit_price }
          : i
      ))
    } else {
      setItems([...items, {
        product_id: product.id,
        product_name: product.name,
        quantity,
        unit_price: product.sell_price,
        total_price: quantity * product.sell_price,
      }])
    }

    setSelectedProduct('')
    setQuantity(1)
  }

  const removeItem = (productId: string) => {
    setItems(items.filter(i => i.product_id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const product = products.find(p => p.id === productId)
    if (product && newQuantity > product.stock) {
      alert(`Estoque insuficiente! Disponível: ${product.stock}`)
      return
    }

    setItems(items.map(i =>
      i.product_id === productId
        ? { ...i, quantity: newQuantity, total_price: newQuantity * i.unit_price }
        : i
    ))
  }

  const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      alert('Adicione pelo menos um produto à venda')
      return
    }

    if (!formData.contact_name) {
      alert('Informe o nome do cliente')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: totalAmount,
          items: items.map(i => ({
            product_id: i.product_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            total_price: i.total_price,
          })),
        }),
      })

      const result = await res.json()

      if (result.success) {
        alert('Venda criada com sucesso!')
        router.push('/vendas')
      } else {
        alert('Erro ao criar venda: ' + result.error)
      }
    } catch (error) {
      console.error('Erro ao criar venda:', error)
      alert('Erro ao criar venda')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nova Venda</h1>
          <p className="text-gray-600">Registre uma nova venda no sistema</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda - Dados do Cliente */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dados do Cliente */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dados do Cliente</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Cliente *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="João Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="text"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="joao@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Produtos */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Produtos</h2>
                
                {/* Adicionar Produto */}
                <div className="flex gap-4 mb-6">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um produto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - R$ {product.sell_price.toFixed(2)} (Estoque: {product.stock})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-24 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Qtd"
                  />

                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar
                  </button>
                </div>

                {/* Lista de Itens */}
                {items.length > 0 ? (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product_id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.product_name}</div>
                          <div className="text-sm text-gray-600">
                            R$ {item.unit_price.toFixed(2)} cada
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="w-32 text-right font-bold text-gray-900">
                          R$ {item.total_price.toFixed(2)}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.product_id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Nenhum produto adicionado. Selecione produtos acima.
                  </div>
                )}
              </div>
            </div>

            {/* Coluna Direita - Resumo e Pagamento */}
            <div className="space-y-6">
              {/* Resumo */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Resumo da Venda
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Itens:</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Quantidade Total:</span>
                    <span className="font-medium">{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-blue-600">R$ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forma de Pagamento *
                  </label>
                  <select
                    required
                    value={formData.payment_method}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pix">PIX</option>
                    <option value="credit_card">Cartão de Crédito</option>
                    <option value="debit_card">Cartão de Débito</option>
                    <option value="cash">Dinheiro</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pendente</option>
                    <option value="paid">Pago</option>
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Informações adicionais sobre a venda..."
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : 'Finalizar Venda'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/vendas')}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

