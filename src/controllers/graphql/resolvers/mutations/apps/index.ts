import { CreateAppResolver } from './create-app';
import { CreateAppStripeOnboardingResolver } from './create-app-stripe-onboarding';
import { UpdateAppResolver } from './update-app';

export const AppsMutations = [
  CreateAppResolver,
  CreateAppStripeOnboardingResolver,
  UpdateAppResolver
];
