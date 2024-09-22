import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

const NAVBAR_HEIGHT = 56;

type Props = {
  x: number;
  y: number;
  children?: React.ReactNode;
};

export default function ContextMenu({ x, y, children }: Props) {
  const isTouchDevice = useIsTouchDevice();
  const xOffset = isTouchDevice ? document.body.scrollWidth / 2 - 100 : x;
  const yOffset = y - NAVBAR_HEIGHT;
  return (
    <div
      className="dropdown is-active is-position-absolute"
      style={{
        left: xOffset,
        top: yOffset,
        width: 200,
      }}
    >
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
}

type ContextMenuItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export function ContextMenuItem({
  icon,
  children,
  onClick,
}: ContextMenuItemProps) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <a
      href="#"
      className="dropdown-item is-flex is-align-items-center"
      style={{ height: 50 }}
      onClick={handleClick}
    >
      <span className="icon is-small mr-3">{icon}</span>
      <span>{children}</span>
    </a>
  );
}
