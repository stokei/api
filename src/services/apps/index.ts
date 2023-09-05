import { AddItemToAppSubscriptionContractService } from './add-item-to-app-subscription-contract';
import { CreateAppService } from './create-app';
import { CreateAppCatalogService } from './create-app-catalog';
import { CreateAppPagarmeAccountService } from './create-app-pagarme-account';
import { CreateAppStripeAccountService } from './create-app-stripe-account';
import { CreateAppStripeAccountDashboardLinkService } from './create-app-stripe-account-dashboard-link';
import { CreateAppStripeAccountOnboardingLinkService } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkService } from './create-app-stripe-account-update-link';
import { FindAllAppsService } from './find-all-apps';
import { FindAppBalancesService } from './find-app-balances';
import { FindAppBillingService } from './find-app-billing';
import { FindAppByIdService } from './find-app-by-id';
import { FindAppCurrentDomainService } from './find-app-current-domain';
import { FindAppCurrentSubscriptionContractService } from './find-app-current-subscription-contract';
import { FindAppEmailInformationsService } from './find-app-email-informations';
import { RemoveItemFromAppSubscriptionContractService } from './remove-item-from-app-subscription-contract';
import { UpdateAppService } from './update-app';

export const AppServices = [
  UpdateAppService,
  CreateAppService,
  CreateAppCatalogService,
  CreateAppStripeAccountService,
  CreateAppStripeAccountDashboardLinkService,
  CreateAppStripeAccountOnboardingLinkService,
  CreateAppStripeAccountUpdateLinkService,
  FindAppCurrentDomainService,
  FindAppCurrentSubscriptionContractService,
  AddItemToAppSubscriptionContractService,
  RemoveItemFromAppSubscriptionContractService,
  FindAppByIdService,
  FindAllAppsService,
  FindAppEmailInformationsService,
  FindAppBillingService,
  CreateAppPagarmeAccountService,
  FindAppBalancesService
];
