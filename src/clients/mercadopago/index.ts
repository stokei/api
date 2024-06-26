import { MercadoPagoConfig } from 'mercadopago';

import { MERCADOPAGO_TOKEN } from '@/environments';

export const mercadopagoClient = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_TOKEN,
  options: {
    timeout: 5000
  }
});
