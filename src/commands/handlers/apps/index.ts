import { AddItemToAppSubscriptionContractCommandHandler } from './add-item-to-app-subscription-contract';
import { CreateAppCommandHandler } from './create-app';
import { CreateAppStripeAccountCommandHandler } from './create-app-stripe-account';
import { CreateAppStripeAccountDashboardLinkCommandHandler } from './create-app-stripe-account-dashboard-link';
import { CreateAppStripeAccountOnboardingLinkCommandHandler } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkCommandHandler } from './create-app-stripe-account-update-link';
import { CreateAppStripeCustomerCommandHandler } from './create-app-stripe-customer';
import { RemoveItemFromAppSubscriptionContractCommandHandler } from './remove-item-from-app-subscription-contract';
import { UpdateAppCommandHandler } from './update-app';
import { UpdateAppStripeCustomerCommandHandler } from './update-app-stripe-customer';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  CreateAppStripeAccountOnboardingLinkCommandHandler,
  CreateAppStripeAccountCommandHandler,
  CreateAppStripeAccountUpdateLinkCommandHandler,
  CreateAppStripeAccountDashboardLinkCommandHandler,
  CreateAppStripeCustomerCommandHandler,
  UpdateAppStripeCustomerCommandHandler,
  AddItemToAppSubscriptionContractCommandHandler,
  RemoveItemFromAppSubscriptionContractCommandHandler
];
