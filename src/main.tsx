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
import ErrorPage from "./core/ErrorPage";
import "./index.css";
import DishPage from "./routes/dish/DishPage";
import DishForm from "./routes/dish/edit/DishForm";
import AddIngredient from "./routes/dish/ingredients/AddIngredient";
import DishIngredientsList from "./routes/dish/ingredients/DishIngredientsList";
import DishesPage from "./routes/dishes/DishesPage";
import AddEatingForm from "./routes/eatings/add/AddEatingForm";
import LogDayPage from "./routes/eatings/LogDayPage";
import LogDaySummary from "./routes/eatings/summary/LogDaySummary";
import HistoryPage from "./routes/history/HistoryPage";
import Login from "./routes/login/Login";
import Root from "./routes/Root";
import SettingsPage from "./routes/settings/SettingsPage";
import RequireAuth from "@/components/RequireAuth";
import dateUtils from "./utils/date-utils";
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
        element: <LogDayPage />,
        children: [
          {
            path: "",
            element: <LogDaySummary />,
          },
          {
            path: ":meal/add",
            element: <AddEatingForm />,
          },
        ],
      },
      {
        path: "dishes",
        element: <DishesPage />,
      },
      {
        path: "dishes/:id",
        element: <DishPage />,
        children: [
          { path: "", element: <Navigate to={`edit`} replace /> },
          {
            path: "edit", // edit/delete
            element: <DishForm />,
          },
          {
            path: "ingredients",
            element: <DishIngredientsList />,
          },
          {
            path: "ingredients/add",
            element: <AddIngredient />,
          },
        ],
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
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
