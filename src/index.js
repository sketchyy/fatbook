import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./core/ErrorPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import DishForm, { dishLoader } from "./routes/dish-form/DishForm.jsx";
import DishesPage from "./routes/dishes/DishesPage";
import Eatings from "./routes/Eatings";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={`eatings`} replace /> },
      {
        path: "/eatings",
        element: <Eatings />,
      },
      {
        path: "/dishes",
        element: <DishesPage />,
      },
      {
        path: "/dishes/:id",
        element: <DishForm />,
        loader: dishLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
