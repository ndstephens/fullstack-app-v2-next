'use client';

import { Calendar, Grid, Settings, User } from 'react-feather';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { SidebarLink } from '@/lib/sidebarLinks';

const icons = { Calendar, Grid, Settings, User };

type SidebarLinkProps = {
  link: SidebarLink;
};

export default function SidebarLink({ link }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link.link;
  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 transition duration-200 hover:stroke-violet-600',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  );
}
