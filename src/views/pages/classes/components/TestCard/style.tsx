import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  category: {
    height: 32,
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    borderTopLeftRadius: 5,
  },
  dateTime: {
    width: '100%',
    height: 130,
    borderBottomLeftRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 'calc(100% - 130px)',
    height: '100%',
    border: '1px solid #999',
    borderLeft: 'none',
    borderRadius: '0 5px 5px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0 4px 0 16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default useStyle;
