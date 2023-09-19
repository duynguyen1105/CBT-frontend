import {
  Button as MButton,
  ButtonProps as MButtonProps,
  UnstyledButton,
} from "@mantine/core";
import useTranslate from "hooks/useTranslate";
import { forwardRef, MouseEvent, PropsWithChildren, Ref } from "react";

interface ButtonCommonProps {
  unstyled?: boolean;
}

interface ButtonLinkProps extends MButtonProps, ButtonCommonProps {
  href: string;
  onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

interface ButtonButtonProps extends MButtonProps, ButtonCommonProps {
  href?: undefined;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

type ButtonElement<T extends string | undefined> = T extends string
  ? HTMLAnchorElement
  : HTMLButtonElement;

type ClickHandler<T extends string | undefined> = (
  event: MouseEvent<ButtonElement<T>>
) => void;

export type ButtonProps<T extends string | undefined> = T extends string
  ? ButtonButtonProps
  : ButtonLinkProps;

export type ButtonRef<T extends string | undefined> = Ref<ButtonElement<T>>;

const Button = forwardRef(function Button<T extends string | undefined>(
  props: PropsWithChildren<ButtonProps<T>>,
  ref: ButtonRef<T>
) {
  const { children, unstyled, href, onClick, ...rest } = props;

  const child = useTranslate(children);

  const Component = unstyled ? UnstyledButton : MButton;

  if (href !== undefined) {
    return (
      <Component
        {...rest}
        ref={ref as Ref<HTMLAnchorElement>}
        onClick={onClick as ClickHandler<string>}
        component="a"
        href={href}
      >
        {child}
      </Component>
    );
  }

  return (
    <Component
      {...rest}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={onClick as ClickHandler<undefined>}
    >
      {child}
    </Component>
  );
});

Button.displayName = "Button";
export default Button;
