import GlassPane from '@/components/GlassPane';

export default function DashboardRootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="candy-mesh isolate h-full p-6">
      <GlassPane className="flex h-full items-center">
        {/* <Sidebar /> */}
        {children}
      </GlassPane>
      <div id="modal" />
    </div>
  );
}
