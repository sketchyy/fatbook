import { ReactNode } from "react";

interface ModalProps {
  visible: boolean;
  title: string;
  body?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

function Modal({ visible, onClose, body, footer, title }: ModalProps) {
  return (
    <div className={"modal" + (visible ? " is-active" : "")}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card px-2">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">{body}</section>
        <footer className="modal-card-foot is-justify-content-end">
          {footer}
        </footer>
      </div>
    </div>
  );
}

export default Modal;
