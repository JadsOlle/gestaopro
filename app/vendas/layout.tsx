import DashboardLayout from '../dashboard/layout';

export default function VendasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
