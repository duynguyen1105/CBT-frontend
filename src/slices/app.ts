import { ColorScheme } from '@mantine/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { primaryNavbar, NavItem } from 'apps/navbar';
import theme from 'apps/theme';
import { UserType } from 'types/user';

export interface AppNavbarVariant {
  primary: NavItem[];
  secondary: NavItem[];
}

export interface AppNavbarState extends AppNavbarVariant {
  collapsed: boolean;
  show: keyof AppNavbarVariant;
}

export interface AppState {
  theme: ColorScheme;
  navbar: AppNavbarState;
  userInfo: UserType;
}

export const initialState: AppState = {
  theme: theme.defaultScheme,
  navbar: {
    primary: primaryNavbar,
    secondary: [],
    collapsed: false,
    show: 'primary',
  },
  userInfo: {
    _id: '',
    name: '',
    password: '',
    email: '',
    role: 'ADMIN_WORKSPACE',
    workspace: 'ws1',
  },
};

export const slice = createSlice({
  name: 'cbt/app',
  initialState,
  reducers: {
    changeTheme(state: AppState, action: PayloadAction<ColorScheme>): void {
      state.theme = action.payload;
    },
    toggleNavbar(state: AppState): void {
      state.navbar.collapsed = !state.navbar.collapsed;
    },
    switchNavbar(state: AppState, action: PayloadAction<keyof AppNavbarVariant>) {
      state.navbar.show = action.payload;
    },
    setUserInfo(state: AppState, action: PayloadAction<UserType>) {
      state.userInfo._id = action.payload._id;
    },
  },
});

export const appReducer = slice.reducer;
