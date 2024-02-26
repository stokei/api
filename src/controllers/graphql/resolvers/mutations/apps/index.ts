import { CreateAppResolver } from './create-app';
import { CreateAppPagarmeAccountResolver } from './create-app-pagarme-account';
import { CreateAppStripeOnboardingResolver } from './create-app-stripe-onboarding';
import { UpdateAppResolver } from './update-app';

export const AppsMutations = [
  CreateAppResolver,
  UpdateAppResolver,
  CreateAppPagarmeAccountResolver,
  CreateAppStripeOnboardingResolver
];
