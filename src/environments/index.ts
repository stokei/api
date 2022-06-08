import * as dotenv from 'dotenv';
import { Environment } from '@stokei/nestjs';

dotenv.config();

// ---------- ENVIRONMENT ----------
export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = NODE_ENV === Environment.PRODUCTION;
export const IS_DEVELOPMENT: boolean = NODE_ENV === Environment.DEVELOPMENT;

// ---------- SERVER ----------
export const DB_URL: string = process.env.DB_URL;
export const HOST: string = process.env.HOST || 'localhost';
export const PORT: number = +process.env.PORT || 3000;
export const URL: string = process.env.URL || `http://${HOST}:${PORT}`;

export const TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY;
export const PASSWORD_SECRET_KEY: string = process.env.PASSWORD_SECRET_KEY;
