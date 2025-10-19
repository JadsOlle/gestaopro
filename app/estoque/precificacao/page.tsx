'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react'

export default function PrecificacaoPage() {
  const [formData, setFormData] = useState({
    cost_price: '',
    markup_percentage: '50',
    profit_margin: '',
    operational_costs: '10',
    taxes: '15',
  })

  const [results, setResults] = useState({
    sell_price: 0,
    profit: 0,
    profit_margin: 0,
    markup: 0,
  })

  const calculatePrice = () => {
    const cost = parseFloat(formData.cost_price) || 0
    const markup = parseFloat(formData.markup_percentage) || 0
    const operational = parseFloat(formData.operational_costs) || 0
    const taxes = parseFloat(formData.taxes) || 0

    // Cálculo com Markup
    const sellPrice = cost * (1 + markup / 100)
    
    // Cálculo de custos totais
    const totalCosts = cost + (sellPrice * operational / 100) + (sellPrice * taxes / 100)
    
    // Lucro
    const profit = sellPrice - totalCosts
    
    // Margem de lucro
    const profitMargin = (profit / sellPrice) * 100
    
    setResults({
      sell_price: sellPrice,
      profit: profit,
      profit_margin: profitMargin,
      markup: markup,
    })
  }

  const calculateByMargin = () => {
    const cost = parseFloat(formData.cost_price) || 0
    const margin = parseFloat(formData.profit_margin) || 0
    const operational = parseFloat(formData.operational_costs) || 0
    const taxes = parseFloat(formData.taxes) || 0

    // Preço de venda baseado na margem desejada
    const sellPrice = cost / (1 - (margin / 100) - (operational / 100) - (taxes / 100))
    
    // Markup calculado
    const markup = ((sellPrice - cost) / cost) * 100
    
    // Lucro
    const totalCosts = cost + (sellPrice * operational / 100) + (sellPrice * taxes / 100)
    const profit = sellPrice - totalCosts
    
    setResults({
      sell_price: sellPrice,
      profit: profit,
      profit_margin: margin,
      markup: markup,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculadora de Precificação</h1>
          <p className="text-gray-600">Calcule o preço de venda ideal dos seus produtos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            {/* Custo do Produto */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                Custo do Produto
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custo de Aquisição/Produção *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost_price}
                    onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="0,00"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Valor que você paga para adquirir ou produzir o produto
                </p>
              </div>
            </div>

            {/* Método 1: Markup */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Método 1: Markup
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentual de Markup (%)
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.markup_percentage}
                  onChange={(e) => setFormData({ ...formData, markup_percentage: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Percentual adicionado sobre o custo (ex: 50% = preço final 1.5x o custo)
                </p>
              </div>

              <button
                onClick={calculatePrice}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calcular por Markup
              </button>
            </div>

            {/* Método 2: Margem de Lucro */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Percent className="w-6 h-6 text-purple-600" />
                Método 2: Margem de Lucro
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Margem de Lucro Desejada (%)
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.profit_margin}
                  onChange={(e) => setFormData({ ...formData, profit_margin: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Percentual de lucro sobre o preço de venda (ex: 30% de R$100 = R$30 de lucro)
                </p>
              </div>

              <button
                onClick={calculateByMargin}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-bold flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calcular por Margem
              </button>
            </div>

            {/* Custos Adicionais */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Custos Adicionais</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custos Operacionais (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.operational_costs}
                    onChange={(e) => setFormData({ ...formData, operational_costs: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Aluguel, energia, salários, etc.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impostos e Taxas (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.taxes}
                    onChange={(e) => setFormData({ ...formData, taxes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ICMS, PIS, COFINS, ISS, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {/* Preço de Venda */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-2 border-blue-200">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Preço de Venda Sugerido</div>
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  R$ {results.sell_price.toFixed(2)}
                </div>
                <p className="text-sm text-gray-700">
                  Este é o preço ideal para vender seu produto
                </p>
              </div>
            </div>

            {/* Detalhamento */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detalhamento</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Custo do Produto</div>
                    <div className="text-lg font-bold text-gray-900">
                      R$ {parseFloat(formData.cost_price || '0').toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Lucro Líquido</div>
                    <div className="text-lg font-bold text-green-600">
                      R$ {results.profit.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {results.profit_margin.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">Margem</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Markup Aplicado</div>
                    <div className="text-lg font-bold text-purple-600">
                      {results.markup.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Custos Operacionais</div>
                    <div className="text-lg font-bold text-orange-600">
                      R$ {(results.sell_price * parseFloat(formData.operational_costs || '0') / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData.operational_costs}%
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Impostos e Taxas</div>
                    <div className="text-lg font-bold text-red-600">
                      R$ {(results.sell_price * parseFloat(formData.taxes || '0') / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData.taxes}%
                  </div>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Dicas de Precificação</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Markup:</strong> Ideal para produtos com custo fixo conhecido</li>
                <li>• <strong>Margem:</strong> Melhor quando você tem uma meta de lucro específica</li>
                <li>• Considere sempre os custos operacionais e impostos</li>
                <li>• Analise os preços da concorrência</li>
                <li>• Revise seus preços periodicamente</li>
                <li>• Margem de 20-30% é considerada saudável para varejo</li>
                <li>• Markup de 50-100% é comum em produtos de revenda</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

