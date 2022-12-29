import dbService from "../../../core/firebase/dbService";

export default async function createDishAction() {
  let dish = {
    name: "",
    foodValue: {
      carbs: "",
      proteins: "",
      calories: "",
      fats: "",
    },
    defaultServingSize: "",
    ingredients: [],
  };

  return await dbService.createDish(dish);
}
