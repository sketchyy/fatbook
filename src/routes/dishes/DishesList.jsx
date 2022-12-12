import React, { Fragment } from "react";
import FoodValue from "../../shared/FoodValue";
import Dish from "./Dish";

function DishesList({ className }) {
  const dishes = [
    {
      _id: "1",
      name: "соус аррабиата вв",
      createdAt: 1616834512792,
      defaultServingSize: null,
      foodValue: {
        calories: 67.9,
        carbs: 7.4,
        fats: 1.9,
        proteins: 5.3,
      },
      ingredients: [],
    },
    {
      _id: "2",
      createdAt: 1616834512792,
      defaultServingSize: 50,
      foodValue: {
        calories: 90,
        carbs: 12,
        fats: 1.9,
        proteins: 0.3,
      },
      ingredients: [],
      name: "Сырок твороржый",
    },
    {
      _id: "3",
      createdAt: 1616834512792,
      defaultServingSize: null,
      foodValue: {
        calories: 67.9,
        carbs: 7.4,
        fats: 1.9,
        proteins: 5.3,
      },
      ingredients: [],
      name: "Кофе",
    },
    {
      _id: "4",
      createdAt: 1616834512792,
      defaultServingSize: null,
      foodValue: {
        calories: 67.9,
        carbs: 7.4,
        fats: 1.9,
        proteins: 5.3,
      },
      ingredients: [],
      name: "Кетчуп",
    },
    {
      _id: "5",
      createdAt: 1616834512792,
      defaultServingSize: 300,
      foodValue: {
        calories: 67.9,
        carbs: 7.4,
        fats: 1.9,
        proteins: 5.3,
      },
      ingredients: [],
      name: "Салат",
    },
  ];
  // Create overlay in "..." menu (Actions: Info, Delete)
  const foodValueLegend = {
    proteins: "Prot",
    fats: "Fat",
    carbs: "Carb",
    calories: "KCal",
  };

  return (
    <div className={className}>
      {/* <div className="column is-half is-offset-half">
        <FoodValue foodValue={foodValueLegend} className="mr-6 mb-2" />
      </div> */}
      {dishes.map((dish) => (
        <div key={dish._id} className="block">
          <Dish dish={dish} />
        </div>
      ))}
    </div>
  );
}

export default DishesList;
