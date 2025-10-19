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
