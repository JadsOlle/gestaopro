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
