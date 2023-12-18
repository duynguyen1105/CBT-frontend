import { Box, createStyles, Flex, Image, PasswordInput, Text, TextInput } from '@mantine/core';
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

const useStyle = createStyles<string, {}>(() => ({
  row: {
    background: 'linear-gradient(60deg, #8ae9de,#70b7af)',
    height: '100vh',
  },
}));

type UserRegisterInfo = {
  username: string;
  password: string;
};

const Register: LayoutComponent = () => {
  const { classes } = useStyle({}, { name: 'PageRegister' });
  const navigate = useNavigate();

  const form = useForm<UserRegisterInfo>({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (user: UserRegisterInfo) => {
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
        message: 'Register successfully',
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Box>
            <Text weight="bold" fz="30px" color="white">
              Get started absolutely free.
            </Text>
            <Flex direction="column" gap="sm" mt={12}>
              <TextInput
                label="Full name"
                placeholder="Full name"
                {...form.getInputProps('name')}
              />
              <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
              />
              <TextInput
                label="Workspace name"
                placeholder="Workspace name"
                {...form.getInputProps('workspaceName')}
              />
              <TextInput
                label="Workspace domain"
                placeholder="Workspace domain"
                {...form.getInputProps('workspaceDomain')}
              />
            </Flex>
          </Box>

          <Flex mt="30px" justify="center">
            <Button color="orange" size="lg" mt="10px">
              Start Now
            </Button>
          </Flex>
        </form>
      </Flex>
    </form>
  );
};

Register.layout = Fluid;
Register.displayName = 'Page.Register';

export default Register;
