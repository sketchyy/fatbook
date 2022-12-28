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
import { deleteDishAction } from "./routes/dish-form/deleteDishAction";
import DishForm, { dishLoader } from "./routes/dish-form/DishForm.jsx";
import DishFormPage from "./routes/dish-form/DishFormPage";
import DishIngredientsForm from "./routes/dish-form/DishIngredientsForm";
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
      },
      {
        path: "dishes/:id",
        element: <DishFormPage />, // DishPage
        children: [
          {
            path: "", // edit/delete
            element: <DishForm />, // DishInfo
            loader: dishLoader,
          },
          {
            path: "edit", //cancel/save
            element: <DishForm />, // DishForm
            loader: dishLoader,
          },
          {
            path: "delete",
            action: deleteDishAction,
          },
          {
            path: "ingredients",
            element: <DishIngredientsForm />,
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
