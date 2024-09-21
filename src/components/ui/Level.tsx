import { clsx } from "clsx";
import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Level({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("level is-mobile", className)} {...divProps}>
      {children}
    </div>
  );
}

export function LevelLeft({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("level-left", className)} {...divProps}>
      {children}
    </div>
  );
}

export function LevelRight({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("level-right", className)} {...divProps}>
      {children}
    </div>
  );
}

export function LevelItem({ children, className, ...divProps }: Props) {
  return (
    <div className={clsx("level-item", className)} {...divProps}>
      {children}
    </div>
  );
}
