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
