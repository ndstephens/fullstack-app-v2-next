export const sidebarLinks = [
  {
    label: 'Home',
    icon: 'Grid',
    link: '/home',
  },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  {
    label: 'Profile',
    icon: 'User',
    link: '/profile',
  },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
] as const;

export type SidebarLink = (typeof sidebarLinks)[number];
