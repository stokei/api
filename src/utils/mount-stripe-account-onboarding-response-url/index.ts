import {
  STRIPE_ONBOARDING_REFRESH_URL,
  STRIPE_ONBOARDING_RETURN_URL
} from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

const stripeOnboardingBase = '/onboardings/stripe';

export const mountStripeAccountOnboardingReturnURL = ({
  domain
}: {
  domain?: string;
}) => {
  return appendPathnameToURL(
    domain || STRIPE_ONBOARDING_RETURN_URL,
    stripeOnboardingBase + '/callback'
  );
};

export const mountStripeAccountOnboardingRefreshURL = ({
  domain
}: {
  domain?: string;
}) => {
  return appendPathnameToURL(
    domain || STRIPE_ONBOARDING_REFRESH_URL,
    stripeOnboardingBase + '/refresh'
  );
};
