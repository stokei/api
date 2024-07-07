import { MercadoPagoProcessorsServices } from './mercadopago';
import { PagseguroProcessorsServices } from './pagseguro';
import { StripeProcessorsServices } from './stripe';

export const PaymentsGatewayProcessorsServices = [
  ...StripeProcessorsServices,
  ...PagseguroProcessorsServices,
  ...MercadoPagoProcessorsServices
];
