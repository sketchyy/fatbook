import { DishPortionOld } from "@/shared/models/DishPortionOld";
import { useRef, useState } from "react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";

interface DishPortionsListItemProps {
  focused: boolean;
  dishPortion: DishPortionOld;
  onAdd: (p: DishPortionOld) => void;
  onUpdate: (p: DishPortionOld) => void;
  onDelete: (p: DishPortionOld) => void;
  isAdded: (p: DishPortionOld) => boolean;
}

function DishPortionListItem({
  focused,
  dishPortion,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: DishPortionsListItemProps) {
  const [size, setSize] = useState<number | undefined>(
    dishPortion.servingSize ?? dishPortion.dish.defaultServingSize ?? undefined,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddClick = () => {
    onAdd({ ...dishPortion, servingSize: Number(size) });
  };

  const handleUpdateClick = () => {
    onUpdate({ ...dishPortion, servingSize: Number(size) });
  };

  const handleDeleteClick = () => {
    setSize(dishPortion.dish.defaultServingSize ?? undefined);
    onDelete(dishPortion);
  };

  if (inputRef.current && focused) {
    inputRef.current.focus();
  }

  return (
    <div className="pb-4 px-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="is-flex is-align-items-end">
          {isAdded(dishPortion) && (
            <button
              className="button is-danger mr-3"
              onClick={() => handleDeleteClick()}
              type="button"
            >
              <FaTimes />
            </button>
          )}
          <div className="is-flex-grow-1">
            <div className="field">
              <label className="label">Portion Size (g.)</label>
              <p className="control">
                <input
                  ref={inputRef}
                  name="servingSize"
                  className="input"
                  type="number"
                  placeholder="g."
                  value={size}
                  onChange={handleInputChange}
                />
              </p>
            </div>
          </div>
          {!isAdded(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleAddClick()}
            >
              <FaPlus />
            </button>
          )}
          {isAdded(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleUpdateClick()}
            >
              <FaCheck />
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default DishPortionListItem;
