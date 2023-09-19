import {Grid, Tabs, Text} from '@mantine/core';
import {IconHome2} from '@tabler/icons-react';
import PageURL from 'apps/PageURL';
import {FC} from 'react';
import Breadcrumb, {DataBreadcrumb} from 'views/components/base/Breadcrumb';
import {CreateClassesTabs} from '../util';
import Content from './Content';
import Member from './Member';
import Setting from './Setting';

const breadcrumb: DataBreadcrumb[] = [
  {
    title: <IconHome2 color="#E1000A" size={24} />,
    href: '/',
  },
  {
    title: 'Create classes',
    href: PageURL.CREATE_CLASSES,
  },
];

const CreateClasses: FC = () => {
  return (
    <Grid>
      <Grid.Col
        h="64px"
        w="100%"
        bg="#fff"
        span={12}
        sx={{display: 'flex', alignItems: 'center', borderRadius: 5}}
      >
        <Text pr={13} fz={20} fw={700} sx={{borderRight: '1px solid #CECECE'}}>
          My Classes
        </Text>

        <Breadcrumb data={breadcrumb} />
      </Grid.Col>

      <Grid.Col mt={12} span={12} bg="#fff">
        <Tabs defaultValue={CreateClassesTabs.SETTING} variant="outline">
          <Tabs.List>
            <Tabs.Tab value={CreateClassesTabs.SETTING}>
              <Text weight="bold" size="sm">
                Setting
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value={CreateClassesTabs.MEMBER}>
              <Text weight="bold" size="sm">
                Member
              </Text>
            </Tabs.Tab>
            <Tabs.Tab value={CreateClassesTabs.CONTENT}>
              <Text weight="bold" size="sm">
                Content
              </Text>
            </Tabs.Tab>
          </Tabs.List>
          <Setting />
          <Content />
          <Member />
        </Tabs>
      </Grid.Col>
    </Grid>
  );
};

export default CreateClasses;
