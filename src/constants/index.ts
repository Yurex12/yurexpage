import { Link } from '@/types/types';
import { Home, Settings, User } from 'lucide-react';

export const links: Link[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];
