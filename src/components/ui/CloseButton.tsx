import { MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler;
};

export default function CloseButton({ onClick }: Props) {
  return (
    <button className="delete" aria-label="close" onClick={onClick}></button>
  );
}
