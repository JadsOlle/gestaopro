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
