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
