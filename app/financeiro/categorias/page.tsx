import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Categorias Financeiras"
      description="Gerencie categorias de receitas e despesas"
      features={[
        "Criar e editar categorias",
        "Categorias de receitas e despesas",
        "Subcategorias",
        "Análise por categoria",
        "Orçamento por categoria"
      ]}
    />
  )
}
