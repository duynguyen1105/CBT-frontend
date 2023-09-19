import {createStyles} from '@mantine/core';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    height: 'calc(100vh - 230px)',
    backgroundColor: '#fff',
    marginTop: 12,
    padding: '0px 12px 12px 12px',
  },
  table: {
    position: 'relative',
    width: '90%',
  },
  tableHead: {
    display: 'flex',
    border: '1px solid #000',
    alignItems: 'center',
    width: '100%',
    height: 32,
  },
  tableItem: {
    display: 'flex',
    border: '1px solid #000',
    lineHeight: 0,
    alignItems: 'center',
    width: '100%',
    height: 32,
  },
  buttonTrash: {
    borderRadius: 5,
    position: 'absolute',
    top: 1,
    right: -32,
    height: 24,
    width: 24,
    backgroundColor: '#F9D0D9',
  },
  buttonAdd: {
    position: 'absolute',
    bottom: -30,
    right: 0,
    padding: 2,
    height: 26,
    backgroundColor: '#0E32AE',
  },
}));

export default useStyle;
