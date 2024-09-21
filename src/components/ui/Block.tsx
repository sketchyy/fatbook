import React, { PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

// https://bulma.io/documentation/elements/block/
export default function Block({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("block", className)} {...divProps}>
      {children}
    </div>
  );
}
