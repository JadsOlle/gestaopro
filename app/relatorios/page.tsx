'use client';

import Button from '../components/Button';
import { DocumentTextIcon } from '../components/Icons';

export default function RelatoriosPage() {
  const relatorios = [
    { id: 1, nome: 'Relatório de Vendas - Outubro', tipo: 'Vendas', data: '15/10/2025', status: 'Gerado' },
    { id: 2, nome: 'Relatório de Clientes - Trimestral', tipo: 'Clientes', data: '01/10/2025', status: 'Gerado' },
    { id: 3, nome: 'Relatório de Estoque', tipo: 'Produtos', data: '10/10/2025', status: 'Processando' },
    { id: 4, nome: 'Relatório Financeiro - Anual', tipo: 'Financeiro', data: '05/10/2025', status: 'Gerado' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <Button variant="primary">
          <DocumentTextIcon className="w-5 h-5 mr-2 inline" />
          Novo Relatório
        </Button>
      </div>

      {/* Tipos de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Vendas', 'Clientes', 'Produtos', 'Financeiro'].map((tipo) => (
          <button
            key={tipo}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <DocumentTextIcon className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">{tipo}</h3>
            <p className="text-sm text-gray-600 mt-1">Gerar relatório</p>
          </button>
        ))}
      </div>

      {/* Lista de Relatórios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Relatórios Recentes</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
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
            {relatorios.map((relatorio) => (
              <tr key={relatorio.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">{relatorio.nome}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {relatorio.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{relatorio.data}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    relatorio.status === 'Gerado' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {relatorio.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Baixar</button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3">Visualizar</button>
                  <button className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
