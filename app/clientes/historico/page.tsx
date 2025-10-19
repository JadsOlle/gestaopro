import PageUnderConstruction from '@/app/components/PageUnderConstruction'

export default function Page() {
  return (
    <PageUnderConstruction
      title="Histórico de Compras"
      description="Visualize o histórico completo de compras de cada cliente"
      features={[
        "Listagem de todas as compras por cliente",
        "Ticket médio por cliente",
        "Frequência de compras",
        "Produtos mais comprados",
        "Valor total gasto",
        "Última compra realizada"
      ]}
    />
  )
}
