import StatCard from '../components/StatCard';
import { UsersIcon, ShoppingBagIcon, ChartBarIcon, DocumentTextIcon } from '../components/Icons';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao GestaoPro</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value="1,234"
          change="+12%"
          changeType="positive"
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Produtos Cadastrados"
          value="567"
          change="+8%"
          changeType="positive"
          icon={<ShoppingBagIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Vendas do Mês"
          value="R$ 45.890"
          change="+23%"
          changeType="positive"
          icon={<ChartBarIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Relatórios Gerados"
          value="89"
          change="-5%"
          changeType="negative"
          icon={<DocumentTextIcon className="w-6 h-6" />}
        />
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas Recentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendas Recentes</h2>
          <div className="space-y-3">
            {[
              { cliente: 'João Silva', valor: 'R$ 1.250', data: '15/10/2025' },
              { cliente: 'Maria Santos', valor: 'R$ 890', data: '14/10/2025' },
              { cliente: 'Pedro Costa', valor: 'R$ 2.100', data: '13/10/2025' },
              { cliente: 'Ana Oliveira', valor: 'R$ 650', data: '12/10/2025' },
            ].map((venda, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{venda.cliente}</p>
                  <p className="text-sm text-gray-500">{venda.data}</p>
                </div>
                <p className="font-semibold text-green-600">{venda.valor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-3">
            {[
              { produto: 'Produto A', vendas: 145, porcentagem: 85 },
              { produto: 'Produto B', vendas: 98, porcentagem: 65 },
              { produto: 'Produto C', vendas: 76, porcentagem: 50 },
              { produto: 'Produto D', vendas: 54, porcentagem: 35 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{item.produto}</p>
                  <p className="text-sm text-gray-600">{item.vendas} vendas</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${item.porcentagem}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[
            { acao: 'Novo cliente cadastrado', descricao: 'João Silva foi adicionado ao sistema', tempo: 'Há 5 minutos' },
            { acao: 'Venda realizada', descricao: 'Produto A vendido para Maria Santos', tempo: 'Há 15 minutos' },
            { acao: 'Produto atualizado', descricao: 'Estoque do Produto B foi atualizado', tempo: 'Há 1 hora' },
            { acao: 'Relatório gerado', descricao: 'Relatório mensal de vendas criado', tempo: 'Há 2 horas' },
          ].map((atividade, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{atividade.acao}</p>
                <p className="text-sm text-gray-600">{atividade.descricao}</p>
              </div>
              <p className="text-xs text-gray-500">{atividade.tempo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
