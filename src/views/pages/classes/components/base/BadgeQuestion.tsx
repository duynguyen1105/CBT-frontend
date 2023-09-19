import {Badge} from '@mantine/core';
import {FC} from 'react';

export interface BadgeQuestionProps {
  title: string;
  variant: 'question' | 'answer';
}

const BadgeQuestion: FC<BadgeQuestionProps> = (props) => {
  const {title, variant, ...rest} = props;
  return (
    <Badge
      tt="uppercase"
      {...rest}
      fz={12}
      w={20}
      h={20}
      bg={variant === 'answer' ? '#999' : '#32B3CD'}
      c={variant === 'answer' ? '#000' : '#fff'}
      p={0}
    >
      {title}
    </Badge>
  );
};

export default BadgeQuestion;
