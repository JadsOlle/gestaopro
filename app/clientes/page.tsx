'use client';

import { useState } from 'react';
import Button from '../components/Button';
import { PlusIcon, SearchIcon } from '../components/Icons';

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const clientes = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 98765-4321', cidade: 'São Paulo' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(21) 99876-5432', cidade: 'Rio de Janeiro' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', telefone: '(31) 97654-3210', cidade: 'Belo Horizonte' },
    { id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', telefone: '(47) 96543-2109', cidade: 'Florianópolis' },
    { id: 5, nome: 'Carlos Souza', email: 'carlos@email.com', telefone: '(85) 95432-1098', cidade: 'Fortaleza' },
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <Button variant="primary">
          <PlusIcon className="w-5 h-5 mr-2 inline" />
          Novo Cliente
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabela de Clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cidade
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{cliente.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{cliente.telefone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{cliente.cidade}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                  <button className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredClientes.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Nenhum cliente encontrado.</p>
        </div>
      )}
    </div>
  );
}
