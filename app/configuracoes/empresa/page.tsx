import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Dados da Empresa"
      description="Configure os dados da sua empresa"
      features={[
        "Razão social e nome fantasia",
        "CNPJ e inscrição estadual",
        "Endereço completo",
        "Contatos e redes sociais",
        "Logo da empresa"
      ]}
    />
  )
}
