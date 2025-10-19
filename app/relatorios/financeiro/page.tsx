import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Relatório de Financeiro"
      description="Relatórios detalhados de financeiro"
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
