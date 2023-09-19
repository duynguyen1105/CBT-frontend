import React, { forwardRef, MouseEvent, Ref } from "react";
import { NavLink as MNavLink, NavLinkProps as MNavLinkProps } from '@mantine/core';
import useTranslate from "hooks/useTranslate";

export interface NavAnchorProp extends MNavLinkProps {
  href: string;
  onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

export interface NavButtonProps extends MNavLinkProps {
  href?: undefined;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export type NavLinkProps<T> = T extends string ? NavAnchorProp : NavButtonProps;

export type NavRef<T extends string | undefined = undefined> = Ref<T extends string ? HTMLAnchorElement : HTMLButtonElement>;

const NavLink = forwardRef(
  function NavLink<T extends string | undefined>(props: NavLinkProps<T>, ref: NavRef<T>) {

    const { label, description, href, onClick, ...rest } = props;
    const navLabel = useTranslate(label);
    const navDesc = useTranslate(description);

    if (href === undefined) {
      return (
        <MNavLink
          {...rest}
          ref={ref as Ref<HTMLButtonElement>}
          component="button"
          label={navLabel}
          description={navDesc}
          onClick={onClick}
        />
      )
    }

    return (
      <MNavLink
        {...rest}
        component="a"
        ref={ref as Ref<HTMLAnchorElement>}
        label={navLabel}
        description={navDesc}
        href={href}
        onClick={onClick}
      />
    );
  }
);

export default NavLink;
