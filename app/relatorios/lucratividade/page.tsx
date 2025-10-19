import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Relatório de Lucratividade"
      description="Relatórios detalhados de lucratividade"
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
