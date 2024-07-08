import { AddItemToAppSubscriptionContractCommandHandler } from './add-item-to-app-subscription-contract';
import { CreateAppCommandHandler } from './create-app';
import { CreateAppCatalogCommandHandler } from './create-app-catalog';
import { CreateAppDefaultLandingPageCommandHandler } from './create-app-default-landing-page';
import { CreateAppPaymentOnboardingLinkCommandHandler } from './create-app-payment-onboarding-link';
import { RemoveItemFromAppSubscriptionContractCommandHandler } from './remove-item-from-app-subscription-contract';
import { UpdateAppCommandHandler } from './update-app';

export const AppCommandHandlers = [
  CreateAppCommandHandler,
  UpdateAppCommandHandler,
  AddItemToAppSubscriptionContractCommandHandler,
  RemoveItemFromAppSubscriptionContractCommandHandler,
  CreateAppCatalogCommandHandler,
  CreateAppDefaultLandingPageCommandHandler,
  CreateAppPaymentOnboardingLinkCommandHandler
];
