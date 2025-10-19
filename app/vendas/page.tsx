'use client';

import Button from '../components/Button';
import { PlusIcon } from '../components/Icons';

export default function VendasPage() {
  const vendas = [
    { id: 1, cliente: 'João Silva', produto: 'Produto A', quantidade: 2, valor: 2500.00, data: '15/10/2025', status: 'Concluída' },
    { id: 2, cliente: 'Maria Santos', produto: 'Produto B', quantidade: 1, valor: 890.00, data: '14/10/2025', status: 'Concluída' },
    { id: 3, cliente: 'Pedro Costa', produto: 'Produto E', quantidade: 1, valor: 2100.00, data: '13/10/2025', status: 'Pendente' },
    { id: 4, cliente: 'Ana Oliveira', produto: 'Produto C', quantidade: 4, valor: 600.00, data: '12/10/2025', status: 'Concluída' },
    { id: 5, cliente: 'Carlos Souza', produto: 'Produto D', quantidade: 10, valor: 455.00, data: '11/10/2025', status: 'Cancelada' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
        <Button variant="primary">
          <PlusIcon className="w-5 h-5 mr-2 inline" />
          Nova Venda
        </Button>
      </div>

      {/* Resumo de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total de Vendas</h3>
          <p className="text-3xl font-bold text-gray-900">{vendas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Valor Total</h3>
          <p className="text-3xl font-bold text-green-600">
            R$ {vendas.reduce((acc, v) => acc + v.valor, 0).toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Ticket Médio</h3>
          <p className="text-3xl font-bold text-blue-600">
            R$ {(vendas.reduce((acc, v) => acc + v.valor, 0) / vendas.length).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      {/* Tabela de Vendas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendas.map((venda) => (
              <tr key={venda.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{venda.cliente}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{venda.produto}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{venda.quantidade}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">
                    R$ {venda.valor.toFixed(2).replace('.', ',')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{venda.data}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    venda.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                    venda.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {venda.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
                  <button className="text-red-600 hover:text-red-900">Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
