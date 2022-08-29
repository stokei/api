import { CreateAppCommandHandler } from './create-app';
import { CreateAppStripeAccountCommandHandler } from './create-app-stripe-account';
import { CreateAppStripeAccountLoginLinkCommandHandler } from './create-app-stripe-account-login-link';
import { CreateAppStripeAccountOnboardingLinkCommandHandler } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkCommandHandler } from './create-app-stripe-account-update-link';
import { CreateAppStripeCustomerCommandHandler } from './create-app-stripe-customer';
import { UpdateAppCommandHandler } from './update-app';
import { UpdateAppStripeCustomerCommandHandler } from './update-app-stripe-customer';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  CreateAppStripeAccountOnboardingLinkCommandHandler,
  CreateAppStripeAccountCommandHandler,
  CreateAppStripeAccountUpdateLinkCommandHandler,
  CreateAppStripeAccountLoginLinkCommandHandler,
  CreateAppStripeCustomerCommandHandler,
  UpdateAppStripeCustomerCommandHandler
];
