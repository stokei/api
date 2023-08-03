import axios from 'axios';

import { PAGARME_KEY, PAGARME_SECRET_KEY } from '@/environments';

export const pagarmeClient = axios.create({
  baseURL: 'https://api.pagar.me/core/v5',
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from(`${PAGARME_SECRET_KEY}:${PAGARME_KEY}`).toString('base64'),
    'Content-Type': 'application/json'
  }
});
