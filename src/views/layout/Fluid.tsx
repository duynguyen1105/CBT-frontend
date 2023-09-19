import { FC, PropsWithChildren } from "react";
import { Box, Container, ContainerProps, createStyles, ScrollArea } from "@mantine/core";

export interface FluidProps extends ContainerProps {}

const useStyle = createStyles((_, __: {}) => ({
  container: {
    width: '100vw',
    height: '100vh',
    margin: 0
  }
}));

const Fluid: FC<PropsWithChildren<FluidProps>> = props => {

  const { children, ...rest } = props;
  const { classes } = useStyle({}, { name: 'Fluid' });

  return (
    <Container {...rest} fluid p={0}>
      <ScrollArea w="100vw" h="100vh">
        <Box className={classes.container}>
          {children}
        </Box>
      </ScrollArea>
    </Container>
  );
}

Fluid.displayName = 'Layout.Fluid';
export default Fluid;
