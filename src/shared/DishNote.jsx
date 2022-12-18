import React from "react";

function DishNote({ dish }) {
  return (
    <div className="block">
      <div className="columns is-vcentered notification is-warning is-light mx-1">
        <button className="delete is-large"></button>
        <div>
          <p className="title is-5">{dish.name}</p>
          {dish.defaultServingSize > 0 && (
            <p className="subtitle is-6">{dish.defaultServingSize} g.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DishNote;
