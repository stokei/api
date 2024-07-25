import { MercadoPagoProcessorsServices } from './mercadopago';
import { PagarmeProcessorsServices } from './pagarme';
import { PagseguroProcessorsServices } from './pagseguro';
import { StripeProcessorsServices } from './stripe';

export const PaymentsGatewayProcessorsServices = [
  ...StripeProcessorsServices,
  ...PagseguroProcessorsServices,
  ...MercadoPagoProcessorsServices,
  ...PagarmeProcessorsServices
];
