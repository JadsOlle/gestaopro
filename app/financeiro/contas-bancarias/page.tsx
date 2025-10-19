import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Contas Bancárias"
      description="Gerencie suas contas bancárias"
      features={[
        "Cadastro de contas bancárias",
        "Saldo atual de cada conta",
        "Histórico de movimentações",
        "Conciliação bancária",
        "Transferências entre contas"
      ]}
    />
  )
}
