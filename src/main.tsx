import "bulma/css/bulma.min.css";
import enGB from "date-fns/locale/en-GB";
import React from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./core/ErrorPage";
import { AuthContextProvider } from "./core/auth/AuthContext";
import "./index.css";
import Root from "./routes/Root";
import DishPage from "./routes/dish/DishPage";
import deleteDishAction from "./routes/dish/delete/deleteDishAction";
import EditDish from "./routes/dish/edit/EditDish.jsx";
import updateDishAction from "./routes/dish/edit/updateDishAction";
import AddIngredientForm from "./routes/dish/ingredients/AddIngredientForm";
import DishIngredientsForm from "./routes/dish/ingredients/DishIngredientsForm";
import DishesPage from "./routes/dishes/DishesPage";
import createDishAction from "./routes/dishes/create/createDishAction";
import AddEatingForm from "./routes/eatings/AddEatingForm";
import LogDayPage from "./routes/eatings/LogDayPage";
import LogDaySummary from "./routes/eatings/LogDaySummary";
import MealPage from "./routes/eatings/MealPage";
import HistoryPage from "./routes/history/HistoryPage";
import Login from "./routes/login/Login";
import SettingsPage from "./routes/settings/SettingsPage";
import RequireAuth from "./shared/components/RequireAuth";
import { dishesSearchLoader } from "./shared/loaders/dishesSearchLoader";
import { userSettingsLoader } from "./shared/loaders/userSettingsLoader";
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
        loader: userSettingsLoader,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        loader: userSettingsLoader,
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
