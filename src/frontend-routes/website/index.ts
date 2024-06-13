import { routesApp } from "./app";
import { routesApps } from "./apps";
import { routesAuth } from "./auth";
import { routesMe } from "./me";

export const websiteRoutes = {
  home: "/",
  notFound: "/404",
  auth: routesAuth,
  app: routesApp,
  apps: routesApps,
  me: routesMe,
};
