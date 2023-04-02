import "bulma/css/bulma.min.css";
import enGB from "date-fns/locale/en-GB";
import React from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./core/auth/AuthContext";
import ErrorPage from "./core/ErrorPage";
import "./index.css";
import deleteDishAction from "./routes/dish/delete/deleteDishAction";
import DishPage from "./routes/dish/DishPage";
import EditDish from "./routes/dish/edit/EditDish.jsx";
import updateDishAction from "./routes/dish/edit/updateDishAction";
import AddIngredientForm from "./routes/dish/ingredients/AddIngredientForm";
import DishIngredientsForm from "./routes/dish/ingredients/DishIngredientsForm";
import createDishAction from "./routes/dishes/create/createDishAction";
import DishesPage from "./routes/dishes/DishesPage";
import AddEatingForm from "./routes/eatings/AddEatingForm";
import LogDayPage from "./routes/eatings/LogDayPage";
import LogDaySummary from "./routes/eatings/LogDaySummary";
import MealPage from "./routes/eatings/MealPage";
import HistoryPage from "./routes/history/HistoryPage";
import Login from "./routes/login/Login";
import Root from "./routes/Root";
import RequireAuth from "./shared/components/RequireAuth";
import { dishesSearchLoader } from "./shared/loaders/dishesSearchLoader";
import dateService from "./shared/services/dateService";
registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

const today = dateService.format(dateService.now());

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
      { index: true, element: <Navigate to={`eatings/${today}`} replace /> },
      {
        path: "eatings",
        element: <Navigate to={`/eatings/${today}`} replace />,
      },
      {
        path: "eatings/:day",
        element: <LogDayPage />,
        children: [
          {
            path: "",
            element: <LogDaySummary />,
          },
          {
            path: ":meal",
            element: <MealPage />,
          },
          {
            path: ":meal/add",
            element: <AddEatingForm />,
            loader: dishesSearchLoader,
          },
        ],
      },
      {
        path: "dishes",
        element: <DishesPage />,
        loader: dishesSearchLoader,
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
            element: <AddIngredientForm />,
            loader: dishesSearchLoader,
          },
        ],
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
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
// reportWebVitals();
