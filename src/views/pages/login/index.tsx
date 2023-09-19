import {
  BackgroundImage,
  Box,
  Center,
  createStyles,
  Grid,
  Image,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {PATHS} from 'api/paths';
import {callApiWithBasicAuth, getApiPath} from 'api/utils';
import theme from 'apps/theme';
import {LayoutComponent} from 'types/layout';
import Button from 'views/components/base/Button';
import Text from 'views/components/base/Text';
import Fluid from 'views/layout/Fluid';
import logo from '../../../assets/images/logo/cbtlogo.png';
import bg from '../../../assets/images/logo/signin_bg.png';
import Cookies from 'js-cookie';
import {COOKIE_AUTH_TOKEN} from 'apps/constants';
import {useNavigate} from 'react-router';
import PageURL from 'apps/PageURL';
import {notifications} from '@mantine/notifications';

const useStyle = createStyles<string, {}>(() => ({
  row: {
    margin: 0,
    height: '100%',
    padding: -8,
    background: '#60CFC2',
  },
  leftCol: {
    height: '100vh',
    padding: '0',
    width: '100%',
  },
  rightCol: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boxSignin: {
    width: '80%',
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
  },
  boxLogin: {
    height: '20%',
    width: '80%',
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
  username: string;
  password: string;
};

const Login: LayoutComponent = () => {
  const {classes} = useStyle({}, {name: 'PageLogin'});
  const navigate = useNavigate();

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
    console.log(res);

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
      <Grid className={classes.row}>
        <Grid.Col span={6} className={classes.leftCol}>
          <BackgroundImage src={bg} style={{width: '60%', height: '100%', objectFit: 'cover'}}>
            <Image src={logo} style={{width: '50%', padding: 22}} />
          </BackgroundImage>
        </Grid.Col>
        <Grid.Col span={6} className={classes.rightCol}>
          <Box className={classes.boxSignin}>
            <Text textTransform="capitalize" fz={32} fw={600} c={theme.layout.color.text.hex}>
              Sign in
            </Text>
            <Text mt={12} c={theme.layout.color.text.hex}>
              Welcome back! Sign in with the data you entered in your registration
            </Text>
          </Box>

          <Box w="60%">
            <TextInput
              size="md"
              label="User Name"
              placeholder="User Name"
              {...form.getInputProps('username')}
            />

            <PasswordInput
              mt={16}
              size="md"
              placeholder="Password"
              label="Password"
              {...form.getInputProps('password')}
            />
            {/* 
            <Center mt={22}>
              <Text c={theme.layout.color.primary.hex}>Forgot your password?</Text>
            </Center> */}
          </Box>

          <Box className={classes.boxLogin} w="60%">
            <Button
              bg={theme.layout.color.primary.hex}
              c={theme.layout.color.text.hex}
              h="30%"
              type="submit"
            >
              Sign in
            </Button>

            <Center>
              <Text>Don't have an account yet?</Text>
              <Text style={{color: theme.layout.color.primary.hex, marginLeft: 8}}>Sign up</Text>
            </Center>
          </Box>
        </Grid.Col>
      </Grid>
    </form>
  );
};

Login.layout = Fluid;
Login.displayName = 'Page.Login';

export default Login;
