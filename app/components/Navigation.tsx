'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: '📊',
    },
    {
      title: 'Financeiro',
      icon: '💰',
      submenu: [
        { title: 'Contas a Pagar', path: '/financeiro/contas-pagar' },
        { title: 'Contas a Receber', path: '/financeiro/contas-receber' },
        { title: 'Fluxo de Caixa', path: '/financeiro/fluxo-caixa' },
        { title: 'DRE', path: '/financeiro/dre' },
        { title: 'Transações', path: '/transacoes' },
        { title: 'Categorias', path: '/financeiro/categorias' },
      ],
    },
    {
      title: 'Estoque',
      icon: '📦',
      submenu: [
        { title: 'Produtos', path: '/produtos' },
        { title: 'Movimentações', path: '/estoque' },
        { title: 'Inventário', path: '/estoque/inventario' },
        { title: 'Precificação', path: '/estoque/precificacao' },
        { title: 'Alertas', path: '/estoque/alertas' },
      ],
    },
    {
      title: 'Vendas',
      icon: '💳',
      submenu: [
        { title: 'Nova Venda', path: '/vendas/nova' },
        { title: 'Histórico', path: '/vendas' },
        { title: 'Metas', path: '/vendas/metas' },
        { title: 'Comissões', path: '/vendas/comissoes' },
      ],
    },
    {
      title: 'Clientes',
      icon: '👥',
      submenu: [
        { title: 'Cadastro', path: '/contatos' },
        { title: 'Histórico de Compras', path: '/clientes/historico' },
        { title: 'Análise de Recorrência', path: '/clientes/recorrencia' },
        { title: 'Segmentação', path: '/clientes/segmentacao' },
      ],
    },
    {
      title: 'Relatórios',
      icon: '📊',
      submenu: [
        { title: 'Visão Geral', path: '/relatorios' },
        { title: 'Financeiro', path: '/relatorios/financeiro' },
        { title: 'Vendas', path: '/relatorios/vendas' },
        { title: 'Estoque', path: '/relatorios/estoque' },
        { title: 'Clientes', path: '/relatorios/clientes' },
        { title: 'Lucratividade', path: '/relatorios/lucratividade' },
      ],
    },
    {
      title: 'Configurações',
      icon: '⚙️',
      submenu: [
        { title: 'Empresa', path: '/configuracoes/empresa' },
        { title: 'Usuários', path: '/configuracoes/usuarios' },
        { title: 'Preferências', path: '/configuracoes/preferencias' },
      ],
    },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              Sistema de Gestão
            </Link>
            
            <div className="flex space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                        isActive(item.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                        item.submenu?.some(sub => isActive(sub.path))
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                      {item.submenu && <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.submenu && openDropdown === item.title && (
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm transition ${
                            isActive(subItem.path)
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  )
}

