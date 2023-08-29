import { PaymentModel } from '@/models/payment.model';

export interface WebhookFindOrCreateStripePaymentMethodDTO {
  payment: PaymentModel;
  stripeCheckoutSession: string;
  stripeAccount?: string;
}
