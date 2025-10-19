'use client'
import { useState } from 'react'
import { Building2, Save, MapPin, Phone, Mail, FileText } from 'lucide-react'

export default function EmpresaPage() {
  const [empresa, setEmpresa] = useState({
    razaoSocial: 'Minha Empresa Ltda',
    nomeFantasia: 'Minha Empresa',
    cnpj: '00.000.000/0001-00',
    inscricaoEstadual: '000.000.000.000',
    inscricaoMunicipal: '00000000',
    telefone: '(11) 9999-9999',
    email: 'contato@minhaempresa.com.br',
    site: 'www.minhaempresa.com.br',
    cep: '00000-000',
    endereco: 'Rua Exemplo, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    complemento: 'Sala 10',
  })

  const handleSave = () => {
    window.alert('Dados da empresa salvos com sucesso!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dados da Empresa</h1>
            <p className="text-gray-600">Gerencie as informações da sua empresa</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar
          </button>
        </div>

        <div className="space-y-6">
          {/* Dados Cadastrais */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Dados Cadastrais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razão Social *
                </label>
                <input
                  type="text"
                  value={empresa.razaoSocial}
                  onChange={(e) => setEmpresa({ ...empresa, razaoSocial: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Fantasia *
                </label>
                <input
                  type="text"
                  value={empresa.nomeFantasia}
                  onChange={(e) => setEmpresa({ ...empresa, nomeFantasia: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ *
                </label>
                <input
                  type="text"
                  value={empresa.cnpj}
                  onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inscrição Estadual
                </label>
                <input
                  type="text"
                  value={empresa.inscricaoEstadual}
                  onChange={(e) => setEmpresa({ ...empresa, inscricaoEstadual: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inscrição Municipal
                </label>
                <input
                  type="text"
                  value={empresa.inscricaoMunicipal}
                  onChange={(e) => setEmpresa({ ...empresa, inscricaoMunicipal: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="text"
                  value={empresa.telefone}
                  onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={empresa.email}
                  onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site
                </label>
                <input
                  type="text"
                  value={empresa.site}
                  onChange={(e) => setEmpresa({ ...empresa, site: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Endereço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP *
                </label>
                <input
                  type="text"
                  value={empresa.cep}
                  onChange={(e) => setEmpresa({ ...empresa, cep: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  value={empresa.endereco}
                  onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  value={empresa.bairro}
                  onChange={(e) => setEmpresa({ ...empresa, bairro: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={empresa.cidade}
                  onChange={(e) => setEmpresa({ ...empresa, cidade: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  value={empresa.estado}
                  onChange={(e) => setEmpresa({ ...empresa, estado: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  {/* Adicionar outros estados */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  value={empresa.complemento}
                  onChange={(e) => setEmpresa({ ...empresa, complemento: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
