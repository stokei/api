import { MercadoPagoConfig } from 'mercadopago';

import { MERCADOPAGO_TOKEN } from '@/environments';

export const mercadopagoClient = (accessToken: string = MERCADOPAGO_TOKEN) =>
  new MercadoPagoConfig({
    accessToken,
    options: {
      timeout: 5000
    }
  });
