import { useRef, useState } from "react";
import { FaCheck, FaExternalLinkAlt, FaPlus, FaTimes } from "react-icons/fa";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { DishPortion } from "@/types/dish-portion";

type Props = {
  focused: boolean;
  dishPortion: DishPortion;
  onAdd: (p: DishPortion) => void;
  onUpdate: (p: DishPortion) => void;
  onDelete: (p: DishPortion) => void;
  isAdded: (p: DishPortion) => boolean;
};

function DishPortionListItem({
  focused,
  dishPortion,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [size, setSize] = useState<number | undefined>(
    dishPortion.portion ?? dishPortion.dish.defaultPortion ?? undefined,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddClick = () => {
    onAdd({ ...dishPortion, portion: Number(size) });
  };

  const handleUpdateClick = () => {
    onUpdate({ ...dishPortion, portion: Number(size) });
  };

  const handleDeleteClick = () => {
    setSize(dishPortion.dish.defaultPortion ?? undefined);
    onDelete(dishPortion);
  };

  const handleOpenDishClick = () => {
    navigate(`/dishes/${dishPortion.dish.id}/edit`, {
      state: { backUrl: location.pathname },
    });
  };

  if (inputRef.current && focused) {
    inputRef.current.focus();
  }

  return (
    <div className="pb-4 px-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="is-flex is-align-items-end">
          <div className="is-flex is-flex-direction-column is-gap-1">
            {isAdded(dishPortion) && (
              <button
                className="button is-danger mr-3"
                onClick={handleDeleteClick}
                type="button"
              >
                <span className="icon is-small">
                  <FaTimes />
                </span>
              </button>
            )}
          </div>
          <div className="is-flex-grow-1">
            <div className="field">
              <div className="is-flex is-gap-1 is-justify-content-space-between is-align-items-center">
                <label className="label">Portion (g.)</label>
                <button
                  className="button is-ghost p-0 mb-2"
                  onClick={handleOpenDishClick}
                  type="button"
                >
                  <span>Open</span>
                  <span className="icon is-small">
                    <FaExternalLinkAlt />
                  </span>
                </button>
              </div>
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
              <span className="icon is-small">
                <FaPlus />
              </span>
            </button>
          )}
          {isAdded(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleUpdateClick()}
            >
              <span className="icon is-small">
                <FaCheck />
              </span>
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default DishPortionListItem;
