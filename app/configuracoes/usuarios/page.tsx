'use client'
import { useState } from 'react'
import { Users, UserPlus, Edit2, Trash2, Shield, Mail } from 'lucide-react'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Admin Sistema', email: 'admin@sistema.com', perfil: 'Administrador', status: 'Ativo', avatar: 'AS' },
    { id: 2, nome: 'João Silva', email: 'joao@empresa.com', perfil: 'Gerente', status: 'Ativo', avatar: 'JS' },
    { id: 3, nome: 'Maria Santos', email: 'maria@empresa.com', perfil: 'Vendedor', status: 'Ativo', avatar: 'MS' },
    { id: 4, nome: 'Pedro Costa', email: 'pedro@empresa.com', perfil: 'Vendedor', status: 'Inativo', avatar: 'PC' },
  ])

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Usuários do Sistema</h1>
            <p className="text-gray-600">Gerencie os usuários e permissões</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Novo Usuário
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Usuários</div>
            <div className="text-3xl font-bold text-blue-600">{usuarios.length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Ativos</div>
            <div className="text-3xl font-bold text-green-600">{usuarios.filter(u => u.status === 'Ativo').length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-2">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Administradores</div>
            <div className="text-3xl font-bold text-purple-600">{usuarios.filter(u => u.perfil === 'Administrador').length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Inativos</div>
            <div className="text-3xl font-bold text-orange-600">{usuarios.filter(u => u.status === 'Inativo').length}</div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Novo Usuário</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" placeholder="Digite o nome" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" placeholder="email@exemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perfil *</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500">
                  <option>Administrador</option>
                  <option>Gerente</option>
                  <option>Vendedor</option>
                  <option>Operador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha *</label>
                <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium">Salvar</button>
              <button onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">Cancelar</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Usuário</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">E-mail</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Perfil</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {usuario.avatar}
                        </div>
                        <div className="font-medium text-gray-900">{usuario.nome}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {usuario.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        usuario.perfil === 'Administrador' ? 'bg-purple-100 text-purple-800' :
                        usuario.perfil === 'Gerente' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {usuario.perfil}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        usuario.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
