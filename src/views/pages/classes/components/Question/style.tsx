import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  radioCustom: {
    '& .answer': {
      margin: '8px 0',
      display: 'flex',
      gap: 12,
      '& .mantine-Radio-root': {
        '& .mantine-Radio-body': {
          '& .mantine-Radio-inner': {
            position: 'initial',

            '& .mantine-Radio-radio': {
              '&:checked': {
                backgroundColor: '#32B3C7',
              },
            },
          },
        },
      },
    },
  },
  inputFill: {
    height: 22,
    '& .mantine-Input-wrapper': {
      height: 22,
      '& .mantine-TextInput-input': {
        height: 22,
        border: 'none',
        borderBottom: '1px solid #999',
        borderRadius: 0,
        width: 120,
        padding: 0,
        minHeight: 22,
      },
    },
  },
  radioManyChoice: {
    alignItems: 'center',
    '& .mantine-Radio-body': {
      height: 15,
      '& .mantine-Radio-inner': {
        position: 'initial',

        '& .mantine-Radio-radio': {
          width: 15,
          height: 15,
          borderRadius: 0,
          '&:checked': {
            backgroundColor: '#32B3C7',
          },
        },
      },
    },
  },
  selectCustom: {
    width: 110,
    height: 26,
    '& > div': {
      '& .mantine-Input-wrapper': {
        height: 26,
        '& > input': {
          height: '100%',
          padding: 0,
          minHeight: 0,
        },
      },
    },
  },
}));

export default useStyle;
