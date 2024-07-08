import { CreateAppResolver } from './create-app';
import { CreateAppPaymentOnboardingLinkResolver } from './create-app-payment-onboarding-link';
import { UpdateAppResolver } from './update-app';

export const AppsMutations = [
  CreateAppResolver,
  UpdateAppResolver,
  CreateAppPaymentOnboardingLinkResolver
];
