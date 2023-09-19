import {Anchor, Breadcrumbs} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import {FC, ReactNode} from 'react';

export interface DataBreadcrumb {
  title: string | ReactNode;
  href: string;
}

export interface BreadcrumbProps {
  data: DataBreadcrumb[];
}

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  const {data, ...rest} = props;
  const items = data.map((item, index) => (
    <Anchor c="#333333" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Breadcrumbs {...rest} ml={12} separator={<IconChevronRight />}>
      {items}
    </Breadcrumbs>
  );
};
export default Breadcrumb;
