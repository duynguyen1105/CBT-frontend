import { ElementType, FC, ReactElement, ReactNode } from "react";

export type LayoutComponent<P = {}> = FC<P> & {
  getLayout?(page: ReactElement): ReactNode;
  layout?: ElementType;
}