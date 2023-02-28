'use client';

import { Calendar, Grid, Settings, User } from 'react-feather';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { SidebarLinkType } from '@/lib/sidebarLinks';

const icons = { Calendar, Grid, Settings, User };

type SidebarLinkProps = {
  link: SidebarLinkType;
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
          'text-gray-400 transition duration-200 hover:text-violet-600',
          isActive && 'text-violet-600'
        )}
      />
    </Link>
  );
}
