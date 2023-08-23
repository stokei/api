import { PaymentModel } from '@/models/payment.model';

export interface WebhookStripePaymentIntentUpdateDTO {
  payment: PaymentModel;
  stripePaymentIntent: string;
  stripeAccount?: string;
}
