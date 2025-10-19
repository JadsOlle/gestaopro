import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Relatório de Estoque"
      description="Relatórios detalhados de estoque"
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
