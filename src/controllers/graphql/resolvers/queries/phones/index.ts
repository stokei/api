import { PhoneResolver } from './phone';
import { PhoneCodesResolver } from './phone-codes';
import { PhonesResolver } from './phones';

export const PhonesQueries = [
  PhoneResolver,
  PhonesResolver,
  PhoneCodesResolver
];
