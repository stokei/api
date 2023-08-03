import { CreateAppResolver } from './create-app';
import { CreateAppPagarmeAccountResolver } from './create-app-pagarme-account';
import { CreateAppStripeDashboardLinkResolver } from './create-app-stripe-dashboard-link';
import { CreateAppStripeOnboardingResolver } from './create-app-stripe-onboarding';
import { UpdateAppResolver } from './update-app';

export const AppsMutations = [
  CreateAppResolver,
  CreateAppStripeOnboardingResolver,
  CreateAppStripeDashboardLinkResolver,
  UpdateAppResolver,
  CreateAppPagarmeAccountResolver
];
