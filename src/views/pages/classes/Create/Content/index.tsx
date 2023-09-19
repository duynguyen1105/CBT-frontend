import {Box, Grid, Tabs, Text} from '@mantine/core';
import {FC} from 'react';
import TestCard from '../../components/TestCard';
import {CreateClassesTabs, StatusClasses, TestCardData} from '../../util';
import useStyle from './style';

const Content: FC = () => {
  const {classes} = useStyle({}, {name: 'CreateClassesContent'});

  return (
    <Tabs.Panel value={CreateClassesTabs.CONTENT}>
      {/* ===============> Start UI for Teacher < ==================== */}
      {/* <Grid className={classes.root}>
        <Grid.Col sx={{position: 'relative'}} span={12}>
          <Button
            size="xs"
            mt={8}
            rightIcon={<IconCirclePlus size={16} />}
            sx={{position: 'absolute', right: 12, top: 0}}
            h={32}
            rightIcon={<IconCirclePlus />}
            fw={400}
          >
            Add
          </Button>
          <Box pt={28}>
            {TestTicketData.map((item) => (
              <TestTicket data={item} key={item.cate} />
            ))}
          </Box>
        </Grid.Col>
      </Grid>
      <Box mt={18} sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant="outline" color="red">
          Cancel
        </Button>
        <Button rightIcon={<IconCirclePlus />} fw={400}>
          Create Classes
        </Button>
      </Box> */}
      {/* ===============> End UI for Teacher < ==================== */}
      {/* ===============> Start UI for Student < ==================== */}
      <Grid className={classes.root}>
        <Grid.Col span={9}>
          <Text mb={12} fz={20} fw={700}>
            Upcomming
          </Text>

          <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto', gap: 32}}>
            {TestCardData.map(
              (item, index) =>
                item.type === StatusClasses.IN_PROGRESS && <TestCard data={item} key={index} />
            )}
          </Box>

          <Text my={12} fz={20} fw={700}>
            Previous
          </Text>

          <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto', gap: 32}}>
            {TestCardData.map(
              (item, index) =>
                item.type === StatusClasses.CLOSED && <TestCard data={item} key={index} />
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
      </Grid>
      {/* ===============> End UI for Student < ==================== */}
    </Tabs.Panel>
  );
};
export default Content;
