import { AddItemToAppSubscriptionContractService } from './add-item-to-app-subscription-contract';
import { CreateAppService } from './create-app';
import { CreateAppCatalogService } from './create-app-catalog';
import { CreateAppPaymentOnboardingLinkService } from './create-app-payment-onboarding-link';
import { FindAllAppsService } from './find-all-apps';
import { FindAppBalancesService } from './find-app-balances';
import { FindAppBillingService } from './find-app-billing';
import { FindAppByIdService } from './find-app-by-id';
import { FindAppBySlugService } from './find-app-by-slug';
import { FindAppCurrentDomainService } from './find-app-current-domain';
import { FindAppCurrentSubscriptionContractService } from './find-app-current-subscription-contract';
import { FindAppEmailInformationsService } from './find-app-email-informations';
import { RemoveItemFromAppSubscriptionContractService } from './remove-item-from-app-subscription-contract';
import { UpdateAppService } from './update-app';

export const AppServices = [
  UpdateAppService,
  CreateAppService,
  CreateAppCatalogService,
  FindAppCurrentDomainService,
  FindAppCurrentSubscriptionContractService,
  AddItemToAppSubscriptionContractService,
  RemoveItemFromAppSubscriptionContractService,
  FindAppByIdService,
  FindAllAppsService,
  FindAppEmailInformationsService,
  FindAppBillingService,
  FindAppBalancesService,
  FindAppBySlugService,
  CreateAppPaymentOnboardingLinkService
];
