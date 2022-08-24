import { CreateAppCommandHandler } from './create-app';
import { CreateAppStripeCustomerCommandHandler } from './create-app-stripe-customer';
import { UpdateAppCommandHandler } from './update-app';
import { UpdateAppStripeCustomerCommandHandler } from './update-app-stripe-customer';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  CreateAppStripeCustomerCommandHandler,
  UpdateAppStripeCustomerCommandHandler
];
