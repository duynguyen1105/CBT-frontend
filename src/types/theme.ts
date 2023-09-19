import { ColorScheme, MantineThemeOverride } from "@mantine/core";

export interface ThemeLayoutHeader {
  height: number;
  bgcolor: string;
}

export interface ThemeLayoutNavbar {
  width: number;
  collapsedWidth: number;
  collapsedPadding: number;
}

export interface ThemeLayoutDropdownWidth {
  profile: number;
  notification: number;
}

export interface ThemeLayoutDropdown {
  width: ThemeLayoutDropdownWidth;
}

export interface ThemeLayoutInput {
  height: number;
  minHeight: number;
  spacingWithLabel: number;
}

export interface ThemeLayoutColorPalette {
  hex: string;
  rgb: string;
}

export interface ThemeLayoutColor {
  primary: ThemeLayoutColorPalette;
  secondary: ThemeLayoutColorPalette;
  text: ThemeLayoutColorPalette;
}

export interface ThemeLayoutChartBar {
  width: number;
  minWidth: number;
  maxWidth: number;
}

export interface ThemeLayoutChart {
  colors: string[];
  bar: ThemeLayoutChartBar;
}

export interface ThemeLayout {
  header: ThemeLayoutHeader;
  navbar: ThemeLayoutNavbar;
  dropdown: ThemeLayoutDropdown;
  input: ThemeLayoutInput;
  padding: number;
  color: ThemeLayoutColor;
  chart: ThemeLayoutChart;
}

export interface ThemeInitial {
  defaultScheme: ColorScheme;
  layout: ThemeLayout;
  variant: Record<ColorScheme, Omit<MantineThemeOverride, "colorScheme">>;
}
