import React, { FC } from "react";
import { LayoutComponent } from "types/layout";
import Shell from "views/layout/Shell";

export interface LayoutContainerProps {
  component: LayoutComponent;
}

const LayoutContainer: FC<LayoutContainerProps> = props => {

  const { component: Component } = props;
  const Layout = Component.layout ?? Shell;

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

LayoutContainer.displayName = 'LayoutContainer';
export default LayoutContainer;
