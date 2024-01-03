import { Box, createStyles, Flex, Image, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PATHS } from 'api/paths';
import { callApiWithBasicAuth, getApiPath } from 'api/utils';
import { COOKIE_AUTH_TOKEN } from 'apps/constants';
import PageURL from 'apps/PageURL';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { LayoutComponent } from 'types/layout';
import Button from 'views/components/base/Button';
import Fluid from 'views/layout/Fluid';
import logo from '../../../assets/images/logo/cbtlogo.png';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect } from 'react';

const useStyle = createStyles<string, {}>(() => ({
  row: {
    background: 'linear-gradient(60deg, #8ae9de,#70b7af)',
    height: '100vh',
  },
}));

type UserLoginInfo = {
  username: string;
  password: string;
};

const Home: LayoutComponent = () => {
  const { classes } = useStyle({}, { name: 'PageLogin' });
  const navigate = useNavigate();
  const userInfo = useGetUserInfo();

  useEffect(() => {
    if (userInfo?.role === 'ADMIN_WORKSPACE') navigate(PageURL.USERS);
  }, []);

  const form = useForm<UserLoginInfo>({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (user: UserLoginInfo) => {
    const res = await callApiWithBasicAuth(
      getApiPath(PATHS.USERS.LOGIN),
      user.username,
      user.password
    );

    if (res?.data) {
      Cookies.set(COOKIE_AUTH_TOKEN, res?.data?.token, {
        path: '/',
      });
      notifications.show({
        message: 'Login successfully',
        color: 'green',
      });
      setTimeout(() => {
        navigate(PageURL.USERS);
      }, 2000);
    } else {
      notifications.show({
        message: res?.error?.message,
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex
        className={classes.row}
        direction="column"
        align="center"
        justify="center"
        pos="relative"
      >
        <Image src={logo} style={{ width: '200px', margin: '50px' }} alt="logo" />
        <Button pos="absolute" top="0" right="20px" mt="20px" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Box w="50%">
          <Text fz="50px" color="#f5f6e4" lh="50px">
            Computer Based Test for Quicker and Cost-Effective Examination Management
          </Text>
          <Text fz="35px" color="#f5f6e4" lh="35px" mt="30px">
            The only platform you will ever need to make learning English easy: integrated apps,
            kept simple, and loved by millions of happy users.
          </Text>
          <Flex mt="30px" justify="center">
            <Button color="#124267" size="lg" mt="20px" onClick={() => navigate('/register')}>
              Start Now
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  );
};

Home.layout = Fluid;
Home.displayName = 'Page.Home';

export default Home;
