'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Sistema de Gestão
            </Link>
            
            <div className="flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive('/')}`}
              >
                📊 Dashboard
              </Link>
              
              <Link
                href="/produtos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive('/produtos')}`}
              >
                📦 Produtos
              </Link>
              
              <Link
                href="/vendas"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive('/vendas')}`}
              >
                💰 Vendas
              </Link>
              
              <Link
                href="/transacoes"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive('/transacoes')}`}
              >
                💳 Transações
              </Link>
              
              <Link
                href="/contatos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive('/contatos')}`}
              >
                👥 Contatos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

