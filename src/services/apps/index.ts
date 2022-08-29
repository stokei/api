import { CreateAppService } from './create-app';
import { CreateAppStripeAccountService } from './create-app-stripe-account';
import { CreateAppStripeAccountLoginLinkService } from './create-app-stripe-account-login-link';
import { CreateAppStripeAccountOnboardingLinkService } from './create-app-stripe-account-onboarding-link';
import { CreateAppStripeAccountUpdateLinkService } from './create-app-stripe-account-update-link';
import { FindAllAppsService } from './find-all-apps';
import { FindAppByIdService } from './find-app-by-id';
import { FindAppCurrentDomainService } from './find-app-current-domain';
import { FindAppCurrentPlanService } from './find-app-current-plan';
import { UpdateAppService } from './update-app';

export const AppServices = [
  CreateAppService,
  UpdateAppService,
  CreateAppStripeAccountService,
  CreateAppStripeAccountLoginLinkService,
  CreateAppStripeAccountOnboardingLinkService,
  CreateAppStripeAccountUpdateLinkService,
  FindAppCurrentDomainService,
  FindAppCurrentPlanService,
  FindAppByIdService,
  FindAllAppsService
];
