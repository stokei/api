import {
  STRIPE_ONBOARDING_REFRESH_URL,
  STRIPE_ONBOARDING_RETURN_URL
} from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

const stripeOnboardingBase = '/onboardings/stripe';

export const mountStripeAccountOnboardingReturnURL = ({
  appId
}: {
  appId?: string;
}) => {
  const baseURL = STRIPE_ONBOARDING_RETURN_URL || 'https://stokei.com';
  const defaultURL = `${baseURL}/apps/${appId}`;
  return appendPathnameToURL(defaultURL, stripeOnboardingBase + '/callback');
};

export const mountStripeAccountOnboardingRefreshURL = ({
  appId
}: {
  appId?: string;
}) => {
  const baseURL = STRIPE_ONBOARDING_REFRESH_URL || 'https://stokei.com';
  const defaultURL = `${baseURL}/apps/${appId}`;
  return appendPathnameToURL(defaultURL, stripeOnboardingBase + '/refresh');
};
