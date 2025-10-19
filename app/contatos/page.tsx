'use client'

import { useEffect, useState } from 'react'
import { Users, UserPlus, Phone, Mail, Building, Search, Filter, Edit, Trash2 } from 'lucide-react'

interface Contact {
  id: string
  name: string
  phone?: string
  email?: string
  type: string
  created_at: string
}

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'customer',
  })

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, filter, searchTerm])

  const loadContacts = async () => {
    try {
      const res = await fetch('/api/contacts')
      const result = await res.json()
      if (result.success) {
        setContacts(result.data)
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = contacts

    // Filtro por tipo
    if (filter !== 'all') {
      filtered = filtered.filter(c => c.type === filter)
    }

    // Busca
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.includes(searchTerm)
      )
    }

    setFilteredContacts(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      
      if (result.success) {
        window.alert('Contato criado com sucesso!')
        setShowForm(false)
        setFormData({ name: '', phone: '', email: '', type: 'customer' })
        loadContacts()
      } else {
        window.alert('Erro ao criar contato: ' + result.error)
      }
    } catch (error) {
      console.error('Erro ao criar contato:', error)
      window.alert('Erro ao criar contato')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      window.alert('Funcionalidade de exclusão será implementada em breve!')
    }
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      customer: 'bg-blue-100 text-blue-800',
      supplier: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800',
    }
    const labels = {
      customer: 'Cliente',
      supplier: 'Fornecedor',
      other: 'Outro',
    }
    return (
      <span className={`px-3 py-1 text-sm rounded-full font-medium ${styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[type as keyof typeof labels] || type}
      </span>
    )
  }

  const totalContacts = contacts.length
  const totalCustomers = contacts.filter(c => c.type === 'customer').length
  const totalSuppliers = contacts.filter(c => c.type === 'supplier').length
  const totalOthers = contacts.filter(c => c.type === 'other').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando contatos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Contatos</h1>
            <p className="text-gray-600">Gerencie seus clientes e fornecedores</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Novo Contato'}
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Total de Contatos</div>
            <div className="text-3xl font-bold text-blue-600">{totalContacts}</div>
            <div className="text-sm text-gray-500 mt-1">Cadastrados</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Clientes</div>
            <div className="text-3xl font-bold text-green-600">{totalCustomers}</div>
            <div className="text-sm text-gray-500 mt-1">{totalContacts > 0 ? ((totalCustomers / totalContacts) * 100).toFixed(0) : 0}% do total</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Fornecedores</div>
            <div className="text-3xl font-bold text-purple-600">{totalSuppliers}</div>
            <div className="text-sm text-gray-500 mt-1">{totalContacts > 0 ? ((totalSuppliers / totalContacts) * 100).toFixed(0) : 0}% do total</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-500">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Outros</div>
            <div className="text-3xl font-bold text-gray-600">{totalOthers}</div>
            <div className="text-sm text-gray-500 mt-1">{totalContacts > 0 ? ((totalOthers / totalContacts) * 100).toFixed(0) : 0}% do total</div>
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-blue-600" />
              Novo Contato
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="customer">Cliente</option>
                  <option value="supplier">Fornecedor</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-lg"
                >
                  Salvar Contato
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar por nome, email ou telefone..."
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Todos
              </button>
              <button
                onClick={() => setFilter('customer')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'customer' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Clientes
              </button>
              <button
                onClick={() => setFilter('supplier')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'supplier' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fornecedores
              </button>
              <button
                onClick={() => setFilter('other')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  filter === 'other' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Outros
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Telefone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Tipo</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Cadastro</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {contact.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {contact.phone}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {contact.email ? (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {contact.email}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">{getTypeBadge(contact.type)}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {new Date(contact.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.alert('Funcionalidade de edição será implementada em breve!')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum contato encontrado</h3>
              <p className="text-gray-600">
                {searchTerm || filter !== 'all'
                  ? 'Tente ajustar os filtros de busca.'
                  : 'Clique em "Novo Contato" para começar.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

