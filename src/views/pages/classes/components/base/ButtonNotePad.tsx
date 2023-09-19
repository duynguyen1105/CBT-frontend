import {Button} from '@mantine/core';
import {IconMessage} from '@tabler/icons-react';
import {FC} from 'react';

const ButtonNotePad: FC = (props) => {
  const {...rest} = props;
  return (
    <Button
      {...rest}
      leftIcon={<IconMessage size={20} stroke={1} />}
      px={8}
      h={24}
      fz={12}
      fw={500}
      variant="default"
    >
      Hide Notepad
    </Button>
  );
};

export default ButtonNotePad;
