import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./core/auth/AuthContext";
import ErrorPage from "./core/ErrorPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import deleteDishAction from "./routes/dish/delete/deleteDishAction";
import DishPage from "./routes/dish/DishPage";
import EditDish from "./routes/dish/edit/EditDish.jsx";
import updateDishAction from "./routes/dish/edit/updateDishAction";
import DishIngredientsForm from "./routes/dish/ingredients/DishIngredientsForm";
import { dishesSearchLoader } from "./routes/dish/ingredients/SearchDish";
import SelectDishForm from "./routes/dish/ingredients/SelectDishForm";
import createDishAction from "./routes/dishes/create/createDishAction";
import DishesPage, { dishesLoader } from "./routes/dishes/DishesPage";
import EatingForm from "./routes/eatings-form/EatingForm";
import Eatings from "./routes/eatings/EatingsPage";
import Login from "./routes/login/Login";
import Root from "./routes/Root";
import RequireAuth from "./shared/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={`eatings`} replace /> },
      {
        path: "eatings",
        element: <Eatings />,
      },
      {
        path: "eatings/:day/:meal",
        element: <EatingForm />,
      },
      {
        path: "dishes",
        element: <DishesPage />,
        loader: dishesLoader,
        action: createDishAction,
      },
      {
        path: "dishes/:id",
        element: <DishPage />,
        children: [
          { path: "", element: <Navigate to={`edit`} replace /> },
          {
            path: "edit", // edit/delete
            element: <EditDish />,
            action: updateDishAction,
          },
          {
            path: "delete",
            action: deleteDishAction,
          },
          {
            path: "ingredients",
            element: <DishIngredientsForm />,
          },
          {
            path: "ingredients/add",
            element: <SelectDishForm />,
            loader: dishesSearchLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
