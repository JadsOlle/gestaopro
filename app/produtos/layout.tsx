import DashboardLayout from '../dashboard/layout';

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
