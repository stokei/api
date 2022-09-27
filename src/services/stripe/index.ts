import { CancelStripeSubscriptionService } from './cancel-stripe-subscription';
import { CreateStripeAccountService } from './create-stripe-account';
import { CreateStripeAccountLoginLinkService } from './create-stripe-account-login-link';
import { CreateStripeAccountOnboardingLinkService } from './create-stripe-account-onboarding-link';
import { CreateStripeAccountUpdateLinkService } from './create-stripe-account-update-link';
import { CreateStripeCheckoutSessionService } from './create-stripe-checkout-session';
import { CreateStripeCustomerService } from './create-stripe-customer';
import { CreateStripeCustomerPortalSessionService } from './create-stripe-customer-portal-session';
import { CreateStripePriceService } from './create-stripe-price';
import { CreateStripeProductService } from './create-stripe-product';
import { CreateStripeSubscriptionService } from './create-stripe-subscription';
import { DeleteStripePriceService } from './delete-stripe-price';
import { DeleteStripeProductService } from './delete-stripe-product';
import { FindStripeCheckoutSessionByIdService } from './find-checkout-session-by-id';
import { FindStripeInvoiceByIdService } from './find-invoice-by-id';
import { FindStripePaymentMethodByIdService } from './find-payment-method-by-id';
import { UpdateStripeCustomerService } from './update-stripe-customer';
import { UpdateStripeProductService } from './update-stripe-product';

export const StripeServices = [
  CreateStripeAccountService,
  CancelStripeSubscriptionService,
  CreateStripeAccountLoginLinkService,
  CreateStripeAccountOnboardingLinkService,
  CreateStripeAccountUpdateLinkService,
  CreateStripeCustomerPortalSessionService,
  CreateStripeCheckoutSessionService,
  CreateStripeCustomerService,
  CreateStripeProductService,
  CreateStripePriceService,
  FindStripePaymentMethodByIdService,
  FindStripeCheckoutSessionByIdService,
  FindStripeInvoiceByIdService,
  UpdateStripeCustomerService,
  DeleteStripeProductService,
  CreateStripeSubscriptionService,
  UpdateStripeProductService,
  DeleteStripePriceService
];
