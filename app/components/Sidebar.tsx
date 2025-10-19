'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon
} from './Icons';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/clientes', label: 'Clientes', icon: UsersIcon },
  { href: '/produtos', label: 'Produtos', icon: ShoppingBagIcon },
  { href: '/vendas', label: 'Vendas', icon: ChartBarIcon },
  { href: '/relatorios', label: 'Relatórios', icon: DocumentTextIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">GestaoPro</h1>
        <p className="text-xs text-gray-400 mt-1">Sistema de Gestão</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <CogIcon className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
