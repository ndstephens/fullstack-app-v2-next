import GlassPane from '@/components/GlassPane';

export default function AuthRootLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="rainbow-mesh isolate h-full p-6">
      <GlassPane className="flex h-full items-center justify-center">
        {children}
      </GlassPane>
    </div>
  );
}
