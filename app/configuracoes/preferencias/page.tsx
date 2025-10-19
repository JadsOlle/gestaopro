import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Preferências"
      description="Configure preferências do sistema"
      features={[
        "Tema claro/escuro",
        "Formato de data e moeda",
        "Notificações",
        "Backup automático",
        "Integrações"
      ]}
    />
  )
}
