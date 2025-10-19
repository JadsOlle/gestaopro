'use client'

import { useState } from 'react'
import { Calculator, DollarSign, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react'

export default function PrecificacaoPage() {
  const [formData, setFormData] = useState({
    // Custos Diretos
    custo_produto: '',
    custo_embalagem: '',
    custo_frete_compra: '',
    
    // Despesas Variáveis (%)
    impostos: '18',
    comissao_vendedor: '5',
    taxa_cartao: '3',
    frete_venda: '8',
    
    // Despesas Fixas Mensais
    aluguel: '',
    energia: '',
    internet: '',
    salarios: '',
    outras_despesas: '',
    
    // Dados de Venda
    vendas_mensais_estimadas: '',
    margem_lucro_desejada: '30',
    preco_mercado: '',
  })

  const [resultado, setResultado] = useState<any>(null)

  const calcular = () => {
    // Custos Diretos
    const custoProduto = parseFloat(formData.custo_produto) || 0
    const custoEmbalagem = parseFloat(formData.custo_embalagem) || 0
    const custoFreteCompra = parseFloat(formData.custo_frete_compra) || 0
    const custoTotal = custoProduto + custoEmbalagem + custoFreteCompra

    // Despesas Variáveis (%)
    const impostos = parseFloat(formData.impostos) || 0
    const comissao = parseFloat(formData.comissao_vendedor) || 0
    const taxaCartao = parseFloat(formData.taxa_cartao) || 0
    const freteVenda = parseFloat(formData.frete_venda) || 0
    const totalDespesasVariaveis = impostos + comissao + taxaCartao + freteVenda

    // Despesas Fixas
    const aluguel = parseFloat(formData.aluguel) || 0
    const energia = parseFloat(formData.energia) || 0
    const internet = parseFloat(formData.internet) || 0
    const salarios = parseFloat(formData.salarios) || 0
    const outrasDespesas = parseFloat(formData.outras_despesas) || 0
    const totalDespesasFixas = aluguel + energia + internet + salarios + outrasDespesas

    // Rateio de Despesas Fixas
    const vendasMensais = parseFloat(formData.vendas_mensais_estimadas) || 1
    const despesaFixaPorUnidade = totalDespesasFixas / vendasMensais

    // Margem de Lucro
    const margemLucro = parseFloat(formData.margem_lucro_desejada) || 0

    // Cálculo do Preço de Venda
    // Fórmula: Preço = (Custo Total + Despesa Fixa por Unidade) / (1 - (Despesas Variáveis% + Margem Lucro%) / 100)
    const percentualTotal = totalDespesasVariaveis + margemLucro
    const precoVenda = (custoTotal + despesaFixaPorUnidade) / (1 - percentualTotal / 100)

    // Análise Detalhada
    const valorImpostos = precoVenda * (impostos / 100)
    const valorComissao = precoVenda * (comissao / 100)
    const valorTaxaCartao = precoVenda * (taxaCartao / 100)
    const valorFreteVenda = precoVenda * (freteVenda / 100)
    const totalDespesasVariaveisReais = valorImpostos + valorComissao + valorTaxaCartao + valorFreteVenda

    const lucroLiquido = precoVenda - custoTotal - despesaFixaPorUnidade - totalDespesasVariaveisReais
    const margemLiquidaReal = (lucroLiquido / precoVenda) * 100

    // Comparação com Mercado
    const precoMercado = parseFloat(formData.preco_mercado) || 0
    const diferencaMercado = precoMercado > 0 ? ((precoVenda - precoMercado) / precoMercado) * 100 : 0
    const competitivo = Math.abs(diferencaMercado) <= 10

    // Ponto de Equilíbrio
    const pontoEquilibrio = totalDespesasFixas / (precoVenda - custoTotal - totalDespesasVariaveisReais)

    setResultado({
      custoTotal,
      despesaFixaPorUnidade,
      totalDespesasVariaveisReais,
      precoVenda,
      lucroLiquido,
      margemLiquidaReal,
      precoMercado,
      diferencaMercado,
      competitivo,
      pontoEquilibrio,
      detalhamento: {
        valorImpostos,
        valorComissao,
        valorTaxaCartao,
        valorFreteVenda,
      }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculadora de Precificação</h1>
          <p className="text-gray-600">Calcule o preço de venda ideal considerando todos os custos e despesas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custos Diretos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                1. Custos Diretos do Produto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo do Produto *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.custo_produto}
                      onChange={(e) => handleInputChange('custo_produto', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo de Embalagem
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.custo_embalagem}
                      onChange={(e) => handleInputChange('custo_embalagem', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frete de Compra
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.custo_frete_compra}
                      onChange={(e) => handleInputChange('custo_frete_compra', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Despesas Variáveis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                2. Despesas Variáveis (% sobre venda)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impostos *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.impostos}
                      onChange={(e) => handleInputChange('impostos', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="18"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comissão de Vendedor
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comissao_vendedor}
                      onChange={(e) => handleInputChange('comissao_vendedor', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taxa de Cartão
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.taxa_cartao}
                      onChange={(e) => handleInputChange('taxa_cartao', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frete de Venda
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.frete_venda}
                      onChange={(e) => handleInputChange('frete_venda', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Despesas Fixas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-purple-600" />
                3. Despesas Fixas Mensais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aluguel
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.aluguel}
                      onChange={(e) => handleInputChange('aluguel', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energia
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.energia}
                      onChange={(e) => handleInputChange('energia', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Internet
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.internet}
                      onChange={(e) => handleInputChange('internet', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salários
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.salarios}
                      onChange={(e) => handleInputChange('salarios', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outras Despesas
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.outras_despesas}
                      onChange={(e) => handleInputChange('outras_despesas', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dados de Venda */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-orange-600" />
                4. Dados de Venda e Mercado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendas Mensais Estimadas *
                  </label>
                  <input
                    type="number"
                    value={formData.vendas_mensais_estimadas}
                    onChange={(e) => handleInputChange('vendas_mensais_estimadas', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Unidades por mês</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margem de Lucro Desejada *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.margem_lucro_desejada}
                      onChange={(e) => handleInputChange('margem_lucro_desejada', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Mercado
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.preco_mercado}
                      onChange={(e) => handleInputChange('preco_mercado', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Preço da concorrência</p>
                </div>
              </div>
            </div>

            <button
              onClick={calcular}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg shadow-lg flex items-center justify-center gap-3"
            >
              <Calculator className="w-6 h-6" />
              Calcular Preço de Venda
            </button>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-1">
            {resultado ? (
              <div className="sticky top-8 space-y-6">
                {/* Preço de Venda */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl p-8 text-white">
                  <div className="text-sm opacity-90 mb-2">Preço de Venda Sugerido</div>
                  <div className="text-5xl font-bold mb-4">
                    R$ {resultado.precoVenda.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <TrendingUp className="w-4 h-4" />
                    Margem Líquida: {resultado.margemLiquidaReal.toFixed(1)}%
                  </div>
                </div>

                {/* Análise de Competitividade */}
                {resultado.precoMercado > 0 && (
                  <div className={`rounded-xl shadow-lg p-6 ${
                    resultado.competitivo ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      {resultado.competitivo ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                      )}
                      <h3 className={`font-bold ${resultado.competitivo ? 'text-green-900' : 'text-orange-900'}`}>
                        {resultado.competitivo ? 'Preço Competitivo!' : 'Atenção ao Preço'}
                      </h3>
                    </div>
                    <div className={`text-sm ${resultado.competitivo ? 'text-green-700' : 'text-orange-700'}`}>
                      <div className="mb-2">
                        <strong>Preço de Mercado:</strong> R$ {resultado.precoMercado.toFixed(2)}
                      </div>
                      <div>
                        <strong>Diferença:</strong> {resultado.diferencaMercado > 0 ? '+' : ''}{resultado.diferencaMercado.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )}

                {/* Detalhamento */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Composição do Preço</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Custo Total</span>
                      <span className="font-bold text-gray-900">R$ {resultado.custoTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Despesa Fixa/Unidade</span>
                      <span className="font-bold text-gray-900">R$ {resultado.despesaFixaPorUnidade.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impostos</span>
                      <span className="font-bold text-red-600">R$ {resultado.detalhamento.valorImpostos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comissão</span>
                      <span className="font-bold text-red-600">R$ {resultado.detalhamento.valorComissao.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxa Cartão</span>
                      <span className="font-bold text-red-600">R$ {resultado.detalhamento.valorTaxaCartao.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frete Venda</span>
                      <span className="font-bold text-red-600">R$ {resultado.detalhamento.valorFreteVenda.toFixed(2)}</span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">Lucro Líquido</span>
                      <span className="font-bold text-green-600">R$ {resultado.lucroLiquido.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Ponto de Equilíbrio */}
                <div className="bg-purple-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-2">Ponto de Equilíbrio</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {Math.ceil(resultado.pontoEquilibrio)} un/mês
                  </div>
                  <p className="text-sm text-purple-700">
                    Vendas necessárias para cobrir todos os custos
                  </p>
                </div>
              </div>
            ) : (
              <div className="sticky top-8 bg-white rounded-xl shadow-lg p-8 text-center">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculadora Pronta</h3>
                <p className="text-gray-600">
                  Preencha os campos ao lado e clique em "Calcular" para ver o preço de venda sugerido
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

