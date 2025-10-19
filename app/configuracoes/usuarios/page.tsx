import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Usuários"
      description="Gerencie usuários e permissões"
      features={[
        "Cadastro de usuários",
        "Perfis de acesso",
        "Permissões por módulo",
        "Histórico de acessos",
        "Autenticação de dois fatores"
      ]}
    />
  )
}
