import { ReactNode } from 'react';
import {
  IconHome,
  IconFileText,
  IconUsers,
  IconStack2,
  IconBrandWindows,
  IconBook,
  IconScanEye,
  IconWorldWww,
} from '@tabler/icons-react';
import PageURL from './PageURL';
import { ROLE, RoleType } from './constants';

export interface NavItem {
  url: string;
  pattern?: RegExp | string;
  label: string;
  roles: RoleType[];
  icon?: ReactNode;
  description?: string;
  rightIcon?: ReactNode;
  children?: NavItem[];
}

export const primaryNavbar: NavItem[] = [
  {
    url: PageURL.OVERVIEW,
    pattern: PageURL.OVERVIEW,
    label: 'Overview',
    icon: <IconScanEye size={20} strokeWidth={1} />,
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    url: PageURL.WORKSPACES,
    pattern: PageURL.WORKSPACES,
    label: 'Workspaces',
    icon: <IconWorldWww size={20} strokeWidth={1} />,
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    url: '/workspace',
    pattern: '/workspace',
    label: 'Workspace',
    icon: <IconHome size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
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
    roles: [ROLE.USER, ROLE.ADMIN_WORKSPACE],
  },
  {
    url: PageURL.CLASSES,
    pattern: PageURL.CLASSES,
    label: 'Classes',
    icon: <IconBrandWindows size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE],
  },
  {
    url: PageURL.LESSONS,
    pattern: PageURL.LESSONS,
    label: 'Lessons',
    icon: <IconBook size={20} strokeWidth={1} />,
    roles: [ROLE.ADMIN_WORKSPACE, ROLE.USER],
  },
];
