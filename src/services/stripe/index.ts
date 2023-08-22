import { AttachStripePaymentMethodToCustomerService } from './attach-stripe-payment-method-to-customer';
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
import { CreateStripeSubscriptionItemService } from './create-stripe-subscription-item';
import { CreateStripeUsageRecordService } from './create-stripe-usage-record';
import { DeleteStripeCustomerService } from './delete-stripe-customer';
import { DeleteStripePriceService } from './delete-stripe-price';
import { DeleteStripeProductService } from './delete-stripe-product';
import { DeleteStripeSubscriptionItemService } from './delete-stripe-subscription-item';
import { FindStripeCheckoutSessionByIdService } from './find-checkout-session-by-id';
import { FindStripeCustomerByIdService } from './find-customer-by-id';
import { FindStripeInvoiceByIdService } from './find-invoice-by-id';
import { FindStripePaymentMethodByIdService } from './find-payment-method-by-id';
import { FindStripeSubscriptionByIdService } from './find-subscription-by-id';
import { UpdateStripeCustomerService } from './update-stripe-customer';
import { UpdateStripeProductService } from './update-stripe-product';
import { UpdateStripeSubscriptionService } from './update-stripe-subscription';
import { UpdateStripeSubscriptionItemService } from './update-stripe-subscription-item';

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
  UpdateStripeProductService,
  DeleteStripePriceService,
  CreateStripeSubscriptionItemService,
  UpdateStripeSubscriptionItemService,
  DeleteStripeSubscriptionItemService,
  CreateStripeUsageRecordService,
  FindStripeSubscriptionByIdService,
  AttachStripePaymentMethodToCustomerService,
  FindStripeCustomerByIdService,
  DeleteStripeCustomerService,
  UpdateStripeSubscriptionService
];
