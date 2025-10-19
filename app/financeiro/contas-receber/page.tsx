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
