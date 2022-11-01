import { convertToISOTimestamp } from '@stokei/nestjs';

export const convertToISOStripeTimestamp = (date: Date | number | string) =>
  Math.floor(convertToISOTimestamp(date) / 1000);
