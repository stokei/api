import { Environment } from '@stokei/nestjs';
import * as dotenv from 'dotenv';

dotenv.config();

// ---------- ENVIRONMENT ----------
export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = NODE_ENV === Environment.PRODUCTION;
export const IS_DEVELOPMENT: boolean = NODE_ENV === Environment.DEVELOPMENT;

// ---------- SERVER ----------
export const DB_URL: string = process.env.DB_URL;
export const SERVER_HOST: string = process.env.HOST || 'localhost';
export const SERVER_PORT: number = +process.env.PORT || 4000;
export const SERVER_URL: string =
  process.env.URL || `http://${SERVER_HOST}:${SERVER_PORT}`;

export const APPLICATION_FEE_PERCENT: number =
  +process.env.APPLICATION_FEE_PERCENT || 10;

export const TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY;

export const PASSWORD_SECRET_KEY: string = process.env.PASSWORD_SECRET_KEY;

export const CHECKOUT_RESPONSE_URL: string = process.env.CHECKOUT_RESPONSE_URL;

export const STRIPE_ONBOARDING_RETURN_URL: string =
  process.env.STRIPE_ONBOARDING_RETURN_URL;
export const STRIPE_ONBOARDING_REFRESH_URL: string =
  process.env.STRIPE_ONBOARDING_REFRESH_URL;

export const STRIPE_WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET;
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY;

export const QENCODE_ACCESS_KEY: string = process.env.QENCODE_ACCESS_KEY;
export const QENCODE_WEBHOOK_ENDPOINT: string =
  process.env.QENCODE_WEBHOOK_ENDPOINT;

export const CLOUDFLARE_KEY: string = process.env.CLOUDFLARE_KEY;
export const CLOUDFLARE_SECRET: string = process.env.CLOUDFLARE_SECRET;
