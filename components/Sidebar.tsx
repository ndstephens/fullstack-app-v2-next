import Card from '@/components/Card';
import SidebarLink from '@/components/SidebarLink';
import { sidebarLinks } from '@/lib/sidebarLinks';

export default function Sidebar() {
  return (
    <Card className="flex h-full w-40 flex-wrap items-center justify-between">
      {sidebarLinks.map((link) => (
        <SidebarLink key={link.label} link={link} />
      ))}
    </Card>
  );
}
