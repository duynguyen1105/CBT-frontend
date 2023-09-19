import {ThemeInitial} from 'types/theme';

const theme: ThemeInitial = {
  defaultScheme: 'light',

  layout: {
    header: {
      height: 65,
      bgcolor: '',
    },
    navbar: {
      width: 300,
      collapsedWidth: 70,
      collapsedPadding: 10,
    },
    dropdown: {
      width: {
        profile: 220,
        notification: 420,
      },
    },
    input: {
      height: 42,
      minHeight: 50,
      spacingWithLabel: 6,
    },
    color: {
      primary: {
        hex: '#00ACC1',
        rgb: '0, 170, 193',
      },
      secondary: {
        hex: '#4E4E50',
        rgb: '78, 78, 80',
      },
      text: {
        hex: '#f6f6f6',
        rgb: '246, 246, 246',
      },
    },
    chart: {
      colors: [
        '#0d30c4',
        '#eb0029',
        '#ec9124',
        '#1f93f6',
        '#1a9b06',
        '#af09af',
        '#f35353',
        '#b6c400',
        '#7d37f8',
        '#08b573',
        '#10c5bf',
        '#9f5a00',
        '#026b13',
        '#f951ee',
        '#800567',
        '#0664a2',
        '#69b21b',
        '#60f3f8',
        '#dc749b',
        '#1569d8',
        '#f2d206',
        '#0096a1',
        '#071180',
        '#6fe553',
        '#7707ae',
      ],
      bar: {
        width: 13,
        minWidth: 8,
        maxWidth: 20,
      },
    },
    padding: 30,
  },
  variant: {
    dark: {},
    light: {
      fontFamily: 'Nunito, sans-serif',
    },
  },
};

export default theme;
