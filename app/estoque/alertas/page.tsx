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
