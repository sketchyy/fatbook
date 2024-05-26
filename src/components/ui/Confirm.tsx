import Modal from "./Modal";

export interface Confirmation {
  visible: boolean;
  accept?: () => void;
}

interface ConfirmProps {
  visible: boolean;
  message: string;
  onConfirm?: () => void;
  onClose: () => void;
}

function Confirm({ visible, message, onConfirm, onClose }: ConfirmProps) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Confirm"
      body={<span>{message}</span>}
      footer={
        <div className="buttons">
          <button className="button" onClick={onClose}>
            Cancel
          </button>
          <button className="button is-success" onClick={onConfirm}>
            OK
          </button>
        </div>
      }
    ></Modal>
  );
}

export default Confirm;
