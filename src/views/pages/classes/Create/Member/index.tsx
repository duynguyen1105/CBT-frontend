import {Grid, Tabs, Text} from '@mantine/core';
import {FC} from 'react';
import TableMember from '../../components/TableMember';
import {CreateClassesTabs, MemberData} from '../../util';
import useStyle from './style';

const Member: FC = () => {
  const {classes} = useStyle({}, {name: 'CreateClassesMember'});
  return (
    <Tabs.Panel value={CreateClassesTabs.MEMBER}>
      <Grid className={classes.root}>
        <Grid.Col span={6} sx={{borderRight: '1px solid #000'}}>
          <Text c="#666666" fz={16} fw={700}>
            Teacher
          </Text>

          <TableMember data={MemberData} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text c="#666666" fz={16} fw={700}>
            Student
          </Text>

          <TableMember data={MemberData} />
        </Grid.Col>
      </Grid>
    </Tabs.Panel>
  );
};
export default Member;
