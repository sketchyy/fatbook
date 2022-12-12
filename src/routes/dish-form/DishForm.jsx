import React from "react";
import { useLoaderData } from "react-router-dom";

export async function dishLoader({ params }) {
  console.log("Dish Form Loader, params:", params);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "test dish",
      });
    }, 300);
  });
}

function DishForm(props) {
  const contact = useLoaderData();

  return <div>dish form {contact.name}</div>;
}

export default DishForm;
