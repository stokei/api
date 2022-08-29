import { Environment } from '@stokei/nestjs';
import * as dotenv from 'dotenv';

dotenv.config();

// ---------- ENVIRONMENT ----------
export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = NODE_ENV === Environment.PRODUCTION;
export const IS_DEVELOPMENT: boolean = NODE_ENV === Environment.DEVELOPMENT;

// ---------- SERVER ----------
export const DB_URL: string = process.env.DB_URL;
export const HOST: string = process.env.HOST || 'localhost';
export const PORT: number = +process.env.PORT || 4000;
export const URL: string = process.env.URL || `http://${HOST}:${PORT}`;

export const TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY;

export const PASSWORD_SECRET_KEY: string = process.env.PASSWORD_SECRET_KEY;

export const CHECKOUT_RESPONSE_URL: string = process.env.CHECKOUT_RESPONSE_URL;

export const STRIPE_ONBOARDING_RETURN_URL: string =
  process.env.STRIPE_ONBOARDING_RETURN_URL;
export const STRIPE_ONBOARDING_REFRESH_URL: string =
  process.env.STRIPE_ONBOARDING_REFRESH_URL;

export const STRIPE_WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET;
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY;
