import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="container is-max-desktop">
      <div className="column is-8 is-offset-2">{children}</div>
    </div>
  );
}
