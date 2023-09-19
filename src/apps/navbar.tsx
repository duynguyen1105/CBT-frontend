import {ReactNode} from 'react';
import {IconHome, IconFileText, IconUsers, IconStack2, IconBrandWindows} from '@tabler/icons-react';
import PageURL from './PageURL';

export interface NavItem {
  url: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  children?: NavItem[];
  pattern?: RegExp | string;
}

export const primaryNavbar: NavItem[] = [
  {
    url: '/workspace',
    pattern: '/workspace',
    label: 'My Workspace',
    icon: <IconHome size={20} strokeWidth={1} />,
  },
  {
    url: '/users',
    pattern: '/users',
    label: 'My Users',
    icon: <IconUsers size={20} strokeWidth={1} />,
  },
  {
    url: PageURL.QUESTIONS,
    pattern: PageURL.QUESTIONS,
    label: 'My Questions',
    icon: <IconFileText size={20} strokeWidth={1} />,
  },
  {
    url: '/test',
    pattern: '/test',
    label: 'My Test',
    icon: <IconStack2 size={20} strokeWidth={1} />,
  },
  {
    url: '/classes',
    pattern: '/classes',
    label: 'My Classes',
    icon: <IconBrandWindows size={20} strokeWidth={1} />,
  },
];
