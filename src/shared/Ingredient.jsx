import React from "react";

function Ingredient({ ingredient }) {
  return (
    <div className="block">
      <div className="columns is-vcentered notification is-warning is-light mx-1">
        <button className="delete is-large"></button>
        <div>
          <p className="title is-5">{ingredient.dish.name}</p>
          {ingredient.servingSize > 0 && (
            <p className="subtitle is-6">{ingredient.servingSize} g.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
