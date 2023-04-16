import { PropsWithChildren } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface MessageProps {
  title: string;
  onClose?: () => void;
  severity?: string;
  className?: string;
}

function Message({
  title,
  onClose,
  children,
  severity = "is-info",
  className = "",
}: PropsWithChildren<MessageProps>) {
  return (
    <article className={"message " + severity + " " + className}>
      <div className="message-header">
        <p className="is-flex is-align-items-center">
          <span className="icon is-medium">
            <FaInfoCircle />
          </span>
          {title}
        </p>
        {onClose && (
          <button
            className="delete"
            aria-label="delete"
            onClick={onClose}
          ></button>
        )}
      </div>
      <div className="message-body">{children}</div>
    </article>
  );
}

export default Message;
