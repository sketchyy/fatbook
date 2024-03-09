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
import { AuthContextProvider } from "./core/auth/AuthContext";
import ErrorPage from "./core/ErrorPage";
import "./index.css";
import DishPage from "./routes/dish/DishPage";
import DishForm from "./routes/dish/edit/DishForm";
import AddIngredientForm from "./routes/dish/ingredients/AddIngredientForm";
import DishIngredientsList from "./routes/dish/ingredients/DishIngredientsList";
import DishesPage from "./routes/dishes/DishesPage";
import AddEatingForm from "./routes/eatings/add/AddEatingForm";
import LogDayPage from "./routes/eatings/LogDayPage";
import LogDaySummary from "./routes/eatings/summary/LogDaySummary";
import HistoryPage from "./routes/history/HistoryPage";
import Login from "./routes/login/Login";
import Root from "./routes/Root";
import SettingsPage from "./routes/settings/SettingsPage";
import RequireAuth from "./shared/components/RequireAuth";
import { dishesSearchLoader } from "./shared/loaders/dishesSearchLoader";
import { userSettingsLoader } from "./shared/loaders/userSettingsLoader";
import dateService from "./shared/services/dateService";
import { QueryClient, QueryClientProvider } from "react-query";

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
            path: ":meal/add",
            element: <AddEatingForm />,
            loader: dishesSearchLoader,
          },
        ],
      },
      {
        path: "dishes",
        element: <DishesPage />,
      },
      ...["dishes/:id", "dishes/new"].map((path) => ({
        path: path,
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
            element: <AddIngredientForm />,
            loader: dishesSearchLoader,
          },
        ],
      })),
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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
    <ToastContainer position="bottom-center" />
  </React.StrictMode>,
);
