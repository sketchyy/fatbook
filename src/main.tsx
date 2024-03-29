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
import DishIngredientAdd from "@/pages/dish/DishIngredientAdd";
import DishIngredients from "@/pages/dish/DishIngredients";
import Dishes from "@/pages/dishes/Dishes";
import EatingsAdd from "@/pages/eatings/EatingsAdd";
import Eatings from "@/pages/eatings/Eatings";
import EatingsSummary from "@/pages/eatings/EatingsSummary";
import History from "@/pages/History";
import Login from "@/pages/Login";
import Root from "@/pages/Root";
import Settings from "@/pages/Settings";
import RequireAuth from "@/components/auth/RequireAuth";
import dateUtils from "@/utils/date-utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/context/Auth";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

const today = dateUtils.format(dateUtils.now());

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
            element: <DishIngredients />,
          },
          {
            path: "ingredients/add",
            element: <DishIngredientAdd />,
          },
        ],
      },
      {
        path: "history",
        element: <History />,
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
    <ToastContainer position="bottom-center" />
  </React.StrictMode>,
);
