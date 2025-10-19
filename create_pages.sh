#!/bin/bash

# Histórico de Compras
cat > app/clientes/historico/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Histórico de Compras"
      description="Visualize o histórico completo de compras de cada cliente"
      features={[
        "Listagem de todas as compras por cliente",
        "Ticket médio por cliente",
        "Frequência de compras",
        "Produtos mais comprados",
        "Valor total gasto",
        "Última compra realizada"
      ]}
    />
  )
}
EOF

# Metas de Vendas
cat > app/vendas/metas/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Metas de Vendas"
      description="Defina e acompanhe metas de vendas"
      features={[
        "Definir metas mensais, trimestrais e anuais",
        "Acompanhamento em tempo real do progresso",
        "Comparativo meta vs realizado",
        "Gráficos de evolução",
        "Metas por vendedor",
        "Alertas de performance"
      ]}
    />
  )
}
EOF

# Comissões
cat > app/vendas/comissoes/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Comissões"
      description="Calcule e gerencie comissões de vendedores"
      features={[
        "Cálculo automático de comissões",
        "Percentuais por produto ou categoria",
        "Relatório de comissões por período",
        "Histórico de pagamentos",
        "Metas e bonificações",
        "Exportação de relatórios"
      ]}
    />
  )
}
EOF

# Contas a Pagar
cat > app/financeiro/contas-pagar/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Contas a Pagar"
      description="Gerencie todas as contas e compromissos a pagar"
      features={[
        "Cadastro de contas a pagar",
        "Controle de vencimentos",
        "Alertas de contas próximas ao vencimento",
        "Registro de pagamentos",
        "Histórico de pagamentos",
        "Relatórios de contas pagas e pendentes"
      ]}
    />
  )
}
EOF

# Contas a Receber
cat > app/financeiro/contas-receber/page.tsx << 'EOF'
import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Contas a Receber"
      description="Controle de valores a receber de clientes"
      features={[
        "Cadastro de contas a receber",
        "Controle de recebimentos",
        "Alertas de inadimplência",
        "Registro de recebimentos parciais",
        "Histórico de recebimentos",
        "Relatórios de contas recebidas e pendentes"
      ]}
    />
  )
}
EOF

echo "Páginas criadas com sucesso!"
