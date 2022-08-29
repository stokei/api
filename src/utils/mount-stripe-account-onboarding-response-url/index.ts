import { STRIPE_ONBOARDING_RETURN_URL } from '@/environments';

const stripeOnboardingBase = '/stripe/onboarding';

export const mountStripeAccountOnboardingReturnURL = ({
  domain
}: {
  domain?: string;
}) => {
  return (
    (domain || STRIPE_ONBOARDING_RETURN_URL) +
    stripeOnboardingBase +
    '/callback'
  );
};

export const mountStripeAccountOnboardingRefreshURL = ({
  domain
}: {
  domain?: string;
}) => {
  return (
    (domain || STRIPE_ONBOARDING_RETURN_URL) + stripeOnboardingBase + '/refresh'
  );
};
