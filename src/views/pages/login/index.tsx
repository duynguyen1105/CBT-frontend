import {
  Box,
  Center,
  createStyles,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PATHS } from 'api/paths';
import { callApi, getApiPath } from 'api/utils';
import { COOKIE_AUTH_TOKEN, STORAGE_USER_INFO } from 'apps/constants';
import PageURL from 'apps/PageURL';
import theme from 'apps/theme';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router';
import { LayoutComponent } from 'types/layout';
import { UserType } from 'types/user';
import Button from 'views/components/base/Button';
import Fluid from 'views/layout/Fluid';
import logo from '../../../assets/images/logo/cbtlogo.png';

const useStyle = createStyles<string, {}>(() => ({
  row: {
    background: 'linear-gradient(60deg, #8ae9de,#70b7af)',
    height: '100vh',
  },
  rightCol: {
    width: '25%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boxSignin: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
  },
  boxLogin: {
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '17px',
    marginTop: '20px',
  },
  textDecor: {
    borderColor: theme.layout.color.secondary.hex,
    border: '1px solid',
    width: '100%',
  },
  boxNotification: {
    width: '80%',
    height: '80%',
    marginLeft: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

type UserLoginInfo = {
  email: string;
  password: string;
};

const Login: LayoutComponent = () => {
  const { classes } = useStyle({}, { name: 'PageLogin' });
  const navigate = useNavigate();
  const token = Cookies.get(COOKIE_AUTH_TOKEN);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  const form = useForm<UserLoginInfo>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async ({ email, password }: UserLoginInfo) => {
    const res = await callApi(getApiPath(PATHS.USERS.LOGIN), 'POST', {
      data: {
        email,
        password,
      },
    });

    if (res?.data) {
      const { token } = res.data;
      Cookies.set(COOKIE_AUTH_TOKEN, token, {
        path: '/',
      });

      const decodedToken = decodeToken(token) as { [key: string]: string };
      const { userName, userId, userRole } = decodedToken;
      const user = {
        _id: userId,
        name: userName,
        email,
        role: userRole,
        workspace: 'ws1',
      } as UserType;
      localStorage.setItem(STORAGE_USER_INFO, JSON.stringify(user));

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
      <Flex className={classes.row} direction="column" align="center" justify="center">
        <Image src={logo} style={{ width: '150px', marginTop: '50px' }} />
        <Box className={classes.rightCol}>
          <Flex align="center" direction="column" m="xl">
            <Text fz={32} fw={600} c={theme.layout.color.text.hex} align="center">
              Log in
            </Text>
          </Flex>

          <Box>
            <TextInput
              size="md"
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              mt={16}
              size="md"
              placeholder="Password"
              label="Password"
              {...form.getInputProps('password')}
            />
          </Box>

          <Box className={classes.boxLogin}>
            <Button
              bg={theme.layout.color.primary.hex}
              c={theme.layout.color.text.hex}
              h="30%"
              type="submit"
            >
              Log in
            </Button>

            <Center>
              <Text>Don't have an account yet?</Text>
              <Text style={{ color: theme.layout.color.primary.hex, marginLeft: 8 }}>Register</Text>
            </Center>
          </Box>
        </Box>
      </Flex>
    </form>
  );
};

Login.layout = Fluid;
Login.displayName = 'Page.Login';

export default Login;
