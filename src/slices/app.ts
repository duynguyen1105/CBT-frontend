import {ColorScheme} from '@mantine/core';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {primaryNavbar, NavItem} from 'apps/navbar';
import theme from 'apps/theme';

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
}

export const initialState: AppState = {
  theme: theme.defaultScheme,
  navbar: {
    primary: primaryNavbar,
    secondary: [],
    collapsed: false,
    show: 'primary',
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
  },
});

export const appReducer = slice.reducer;
