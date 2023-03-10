import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/Sidebar';

export default function DashboardRootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="candy-mesh isolate h-full p-6">
      <GlassPane className="flex h-full gap-x-6">
        <Sidebar />
        {children}
      </GlassPane>
      <div id="modal" />
    </div>
  );
}
