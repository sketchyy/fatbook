import React, { PropsWithChildren, ReactNode } from "react";
import { clsx } from "clsx";

type Color =
  | "primary"
  | "link"
  | "white"
  | "light"
  | "dark"
  | "black"
  | "info"
  | "success"
  | "warning"
  | "danger";

type Props = {
  size?: "small" | "medium" | "large";
  variant?: "rounded" | "outline" | "ghost" | "text";
  icon?: ReactNode;
  iconRight?: ReactNode;
  color?: Color;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// See example with custom component: https://github.com/alexkatz/react-tiny-popover?tab=readme-ov-file#examples
const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      children,
      size,
      variant,
      color,
      icon,
      iconRight,
      loading,
      className,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...buttonProps}
        className={clsx("button", className, {
          ["is-" + color]: color,
          ["is-" + size]: size,
          ["is-" + variant]: variant,
          "is-loading": loading,
        })}
      >
        {icon && <span className="icon">{icon}</span>}
        {children && <span>{children}</span>}
        {iconRight && <span className="icon">{iconRight}</span>}
      </button>
    );
  },
);

export default Button;
