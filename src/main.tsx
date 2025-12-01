import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "@/pages/login/index";
import Signup from "@/pages/signup";
import ForgotPassword from "@/pages/forgot-password";
import { Toaster } from "@/shared/components/shadcn/sonner";
import MainLayout from "@/shared/components/organisms/layout";
import { APP_ROUTES } from "@/shared/constants/app-routes.constant";

const appRoutes = APP_ROUTES.filter((route) => route.component).map((route) => {
  const Component = route.component!;
  return {
    path: route.path,
    element: <Component />,
  };
});

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    element: <MainLayout />,
    children: appRoutes,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="top-center" theme="light" />
  </StrictMode>
);
