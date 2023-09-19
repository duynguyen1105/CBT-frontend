import {FC} from 'react';
import BadgeQuestion from '../base/BadgeQuestion';
import Text from 'views/components/base/Text';
import {Group, Select} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons-react';
import useStyle from './style';

export interface DataDropdown {
  value: string;
  label: string;
}

export interface DropdownSelectProps {
  data: DataDropdown[];
  content: string;
  numberQuestion: string;
}

const TrueFalse: FC<DropdownSelectProps> = (props) => {
  const {data, content, numberQuestion, ...rest} = props;
  const {classes} = useStyle({}, {name: 'QuestionComponent'});
  return (
    <Group {...rest} mt={4}>
      <BadgeQuestion title={numberQuestion} variant="question" />
      <Select
        className={classes.selectCustom}
        rightSection={<IconChevronDown size="1rem" />}
        data={data}
      />
      <Text fz={13}>{content}</Text>
    </Group>
  );
};

export default TrueFalse;
