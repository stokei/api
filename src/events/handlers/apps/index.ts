import { AppCreatedHandler } from './app-created.handler';
import { AppStripeAccountCreatedHandler } from './app-stripe-account-created.handler';
import { AppUpdatedHandler } from './app-updated.handler';

export const AppEventsHandlers = [
  AppCreatedHandler,
  AppUpdatedHandler,
  AppStripeAccountCreatedHandler
];
