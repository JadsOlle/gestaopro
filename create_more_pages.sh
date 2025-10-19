#!/bin/bash

# Categorias
cat > app/financeiro/categorias/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Categorias Financeiras"
      description="Gerencie categorias de receitas e despesas"
      features={[
        "Criar e editar categorias",
        "Categorias de receitas e despesas",
        "Subcategorias",
        "Análise por categoria",
        "Orçamento por categoria"
      ]}
    />
  )
}
EOF

# Contas Bancárias
cat > app/financeiro/contas-bancarias/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Contas Bancárias"
      description="Gerencie suas contas bancárias"
      features={[
        "Cadastro de contas bancárias",
        "Saldo atual de cada conta",
        "Histórico de movimentações",
        "Conciliação bancária",
        "Transferências entre contas"
      ]}
    />
  )
}
EOF

# Inventário
cat > app/estoque/inventario/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Inventário"
      description="Realize contagens e ajustes de estoque"
      features={[
        "Contagem de estoque",
        "Ajustes de inventário",
        "Diferenças entre sistema e físico",
        "Histórico de inventários",
        "Relatórios de divergências"
      ]}
    />
  )
}
EOF

# Alertas de Estoque
cat > app/estoque/alertas/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Alertas de Estoque"
      description="Configure alertas automáticos de estoque"
      features={[
        "Alertas de estoque baixo",
        "Alertas de produtos vencendo",
        "Notificações por email",
        "Produtos sem movimentação",
        "Configuração de níveis mínimos"
      ]}
    />
  )
}
EOF

# Recorrência de Clientes
cat > app/clientes/recorrencia/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Análise de Recorrência"
      description="Analise a recorrência de compras dos clientes"
      features={[
        "Taxa de recompra",
        "Tempo médio entre compras",
        "Clientes ativos vs inativos",
        "Previsão de próxima compra",
        "Estratégias de retenção"
      ]}
    />
  )
}
EOF

# Segmentação
cat > app/clientes/segmentacao/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Segmentação de Clientes"
      description="Segmente clientes por comportamento e valor"
      features={[
        "Análise RFM (Recência, Frequência, Valor)",
        "Clientes VIP",
        "Clientes em risco",
        "Segmentação personalizada",
        "Campanhas direcionadas"
      ]}
    />
  )
}
EOF

# Relatórios
for tipo in financeiro vendas estoque clientes lucratividade; do
  cat > "app/relatorios/${tipo}/page.tsx" << EOF
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Relatório de ${tipo^}"
      description="Relatórios detalhados de ${tipo}"
      features={[
        "Análises detalhadas",
        "Gráficos interativos",
        "Exportação em PDF e Excel",
        "Filtros avançados",
        "Comparativos de períodos"
      ]}
    />
  )
}
EOF
done

# Configurações
cat > app/configuracoes/empresa/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Dados da Empresa"
      description="Configure os dados da sua empresa"
      features={[
        "Razão social e nome fantasia",
        "CNPJ e inscrição estadual",
        "Endereço completo",
        "Contatos e redes sociais",
        "Logo da empresa"
      ]}
    />
  )
}
EOF

cat > app/configuracoes/usuarios/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Usuários"
      description="Gerencie usuários e permissões"
      features={[
        "Cadastro de usuários",
        "Perfis de acesso",
        "Permissões por módulo",
        "Histórico de acessos",
        "Autenticação de dois fatores"
      ]}
    />
  )
}
EOF

cat > app/configuracoes/preferencias/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Preferências"
      description="Configure preferências do sistema"
      features={[
        "Tema claro/escuro",
        "Formato de data e moeda",
        "Notificações",
        "Backup automático",
        "Integrações"
      ]}
    />
  )
}
EOF

echo "Todas as páginas foram criadas com sucesso!"
