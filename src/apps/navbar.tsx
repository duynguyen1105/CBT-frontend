import { ReactNode } from 'react';
import {
  IconHome,
  IconFileText,
  IconUsers,
  IconStack2,
  IconBrandWindows,
} from '@tabler/icons-react';
import PageURL from './PageURL';
import { ROLE, RoleType } from './constants';

export interface NavItem {
  url: string;
  pattern?: RegExp | string;
  label: string;
  icon?: ReactNode;
  description?: string;
  rightIcon?: ReactNode;
  children?: NavItem[];
  roles?: RoleType[];
}

export const primaryNavbar: NavItem[] = [
  {
    url: '/workspace',
    pattern: '/workspace',
    label: 'Workspace',
    icon: <IconHome size={20} strokeWidth={1} />,
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    url: '/users',
    pattern: '/users',
    label: 'Users',
    icon: <IconUsers size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
  },
  {
    url: PageURL.QUESTIONS,
    pattern: PageURL.QUESTIONS,
    label: 'Questions',
    icon: <IconFileText size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
  },
  {
    url: PageURL.TESTS,
    pattern: PageURL.TESTS,
    label: 'Tests',
    icon: <IconStack2 size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
  },
  {
    url: PageURL.MY_TESTS,
    pattern: PageURL.MY_TESTS,
    label: 'My Tests',
    icon: <IconStack2 size={20} strokeWidth={1} />,
    roles: [ROLE.USER],
  },
  {
    url: PageURL.CLASSES,
    pattern: PageURL.CLASSES,
    label: 'Classes',
    icon: <IconBrandWindows size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
  },
  {
    url: '/exam',
    pattern: '/exam',
    label: 'Exam',
    icon: <IconBrandWindows size={20} strokeWidth={1} />,
  },
];
