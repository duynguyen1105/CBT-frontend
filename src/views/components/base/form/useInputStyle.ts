import { createStyles } from "@mantine/core";
import defaultTheme from 'apps/theme';

const {
  spacingWithLabel,
  height,
  minHeight
} = defaultTheme.layout.input;

const useInputStyle = createStyles<string, {}>(() => ({
  input: {
    marginTop: 16,
    
    label: {
      color: '#fff',
      marginBottom: spacingWithLabel
    },
    input: {
      height,
      backgroundColor: 'transparent',
      border: '1px solid rgb(61, 61, 77)',
      color: '#fff',
      minHeight,

      '::placeholder': {
        color: 'rgb(130, 130, 153)'
      }
    },

    '.mantine-Input-input': {
      minHeight
    },
  }
}));

export default useInputStyle;
