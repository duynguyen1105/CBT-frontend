import { Box } from '@mantine/core';

import defaultTheme from 'apps/theme';
import { LayoutComponent } from 'types/layout';

import TestForm from 'views/components/base/form/FormTest';
import Shell from 'views/layout/Shell';

const { padding } = defaultTheme.layout;

const Test: LayoutComponent = () => {
  return (
    <Box pb={padding}>
      <TestForm />
    </Box>
  );
};

Test.layout = Shell;
Test.displayName = 'Page.Test';

export default Test;
