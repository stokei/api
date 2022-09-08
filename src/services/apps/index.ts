import { CreateAppService } from './create-app';
import { CreateAppStripeAccountService } from './create-app-stripe-account';
import { CreateAppStripeAccountDashboardLinkService } from './create-app-stripe-account-dashboard-link';
import { CreateAppStripeAccountOnboardingLinkService } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkService } from './create-app-stripe-account-update-link';
import { FindAllAppsService } from './find-all-apps';
import { FindAppByIdService } from './find-app-by-id';
import { FindAppCurrentDomainService } from './find-app-current-domain';
import { FindAppCurrentSubscriptionPlanService } from './find-app-current-subscription-plan';
import { UpdateAppService } from './update-app';

export const AppServices = [
  CreateAppService,
  UpdateAppService,
  CreateAppStripeAccountService,
  CreateAppStripeAccountDashboardLinkService,
  CreateAppStripeAccountOnboardingLinkService,
  CreateAppStripeAccountUpdateLinkService,
  FindAppCurrentDomainService,
  FindAppCurrentSubscriptionPlanService,
  FindAppByIdService,
  FindAllAppsService
];
