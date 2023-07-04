import { AddAppAdminToAppSubscriptionContractCommandHandler } from './add-app-admin-to-app-subscription-contract';
import { AddAppInstructorToAppSubscriptionContractCommandHandler } from './add-app-instructor-to-app-subscription-contract';
import { AddItemToAppSubscriptionContractCommandHandler } from './add-item-to-app-subscription-contract';
import { CreateAppCommandHandler } from './create-app';
import { CreateAppCatalogCommandHandler } from './create-app-catalog';
import { CreateAppDefaultLandingPageCommandHandler } from './create-app-default-landing-page';
import { CreateAppStripeAccountCommandHandler } from './create-app-stripe-account';
import { CreateAppStripeAccountDashboardLinkCommandHandler } from './create-app-stripe-account-dashboard-link';
import { CreateAppStripeAccountOnboardingLinkCommandHandler } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkCommandHandler } from './create-app-stripe-account-update-link';
import { RemoveAppAdminFromAppSubscriptionContractCommandHandler } from './remove-app-admin-from-app-subscription-contract';
import { RemoveAppInstructorFromAppSubscriptionContractCommandHandler } from './remove-app-instructor-from-app-subscription-contract';
import { RemoveItemFromAppSubscriptionContractCommandHandler } from './remove-item-from-app-subscription-contract';
import { UpdateAppCommandHandler } from './update-app';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  CreateAppStripeAccountOnboardingLinkCommandHandler,
  CreateAppStripeAccountCommandHandler,
  CreateAppStripeAccountUpdateLinkCommandHandler,
  CreateAppStripeAccountDashboardLinkCommandHandler,
  AddItemToAppSubscriptionContractCommandHandler,
  RemoveItemFromAppSubscriptionContractCommandHandler,
  AddAppInstructorToAppSubscriptionContractCommandHandler,
  RemoveAppInstructorFromAppSubscriptionContractCommandHandler,
  AddAppAdminToAppSubscriptionContractCommandHandler,
  RemoveAppAdminFromAppSubscriptionContractCommandHandler,
  CreateAppCatalogCommandHandler,
  CreateAppDefaultLandingPageCommandHandler
];
