import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Contas a Pagar"
      description="Gerencie todas as contas e compromissos a pagar"
      features={[
        "Cadastro de contas a pagar",
        "Controle de vencimentos",
        "Alertas de contas próximas ao vencimento",
        "Registro de pagamentos",
        "Histórico de pagamentos",
        "Relatórios de contas pagas e pendentes"
      ]}
    />
  )
}
