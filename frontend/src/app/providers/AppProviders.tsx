import { RouterProvider } from "react-router/dom";
import { router } from "../router/index";

export default function AppProviders() {
  return <RouterProvider router={router} />;
}
