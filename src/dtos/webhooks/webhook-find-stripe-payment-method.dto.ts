import { PaymentModel } from '@/models/payment.model';

export interface WebhookFindStripePaymentMethodDTO {
  payment: PaymentModel;
  stripeCheckoutSession: string;
  stripeAccount?: string;
}
