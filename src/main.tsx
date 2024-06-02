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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "@/pages/ErrorPage";
import "./index.css";
import Dish from "@/pages/dish/Dish";
import DishEdit from "@/pages/dish/DishEdit";
import Dishes from "@/pages/dishes/Dishes";
import EatingsAdd from "@/pages/eatings/EatingsAdd";
import Eatings from "@/pages/eatings/Eatings";
import EatingsSummary from "@/pages/eatings/EatingsSummary";
import Trends from "@/pages/Trends";
import Login from "@/pages/Login";
import Root from "@/pages/Root";
import Settings from "@/pages/Settings";
import RequireAuth from "@/components/auth/RequireAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/Auth";
import { formatDate, now } from "@/utils/date-utils";
import DishIngredientsLoader from "@/pages/dish/DishIngredientsLoader";
import DishIngredientAddLoader from "@/pages/dish/DishIngredientAddLoader";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

const today = formatDate(now());

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
        element: <Eatings />,
        children: [
          {
            path: "",
            element: <EatingsSummary />,
          },
          {
            path: ":meal/add",
            element: <EatingsAdd />,
          },
        ],
      },
      {
        path: "dishes",
        element: <Dishes />,
      },
      {
        path: "dishes/:id",
        element: <Dish />,
        children: [
          { path: "", element: <Navigate to={`edit`} replace /> },
          {
            path: "edit", // edit/delete
            element: <DishEdit />,
          },
          {
            path: "ingredients",
            element: <DishIngredientsLoader />,
          },
          {
            path: "ingredients/add",
            element: <DishIngredientAddLoader />,
          },
        ],
      },
      {
        path: "trends",
        element: <Trends />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>,
);
