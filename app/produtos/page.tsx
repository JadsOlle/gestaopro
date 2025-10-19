'use client';

import { useState } from 'react';
import Button from '../components/Button';
import { PlusIcon, SearchIcon } from '../components/Icons';

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const produtos = [
    { id: 1, nome: 'Produto A', categoria: 'Eletrônicos', preco: 1250.00, estoque: 45 },
    { id: 2, nome: 'Produto B', categoria: 'Móveis', preco: 890.00, estoque: 23 },
    { id: 3, nome: 'Produto C', categoria: 'Vestuário', preco: 150.00, estoque: 120 },
    { id: 4, nome: 'Produto D', categoria: 'Alimentos', preco: 45.50, estoque: 200 },
    { id: 5, nome: 'Produto E', categoria: 'Eletrônicos', preco: 2100.00, estoque: 12 },
  ];

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <Button variant="primary">
          <PlusIcon className="w-5 h-5 mr-2 inline" />
          Novo Produto
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cards de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProdutos.map((produto) => (
          <div key={produto.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {produto.categoria}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                produto.estoque > 50 ? 'bg-green-100 text-green-800' :
                produto.estoque > 20 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {produto.estoque} un.
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{produto.nome}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </p>
            
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                Editar
              </Button>
              <Button variant="danger" size="sm" className="flex-1">
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProdutos.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
}
