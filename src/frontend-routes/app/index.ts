import { routesAuth } from "./auth";
import { routesCheckout } from "./checkout";
import { routesCustomPage } from "./custom-page";
import { routesCustomers } from "./customers";
import { routesMe } from "./me";
import { routesProduct } from "./product";
import { routesStore } from "./store";

export const appRoutes = {
  home: "/",
  notFound: "/404",
  customPage: routesCustomPage,
  checkout: routesCheckout,
  product: routesProduct,
  customers: routesCustomers,
  auth: routesAuth,
  me: routesMe,
  store: routesStore,
};
