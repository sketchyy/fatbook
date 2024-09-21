import React, { PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

// https://bulma.io/documentation/elements/box/
export default function Box({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("box", className)} {...divProps}>
      {children}
    </div>
  );
}
