import { AppAvatarResolver } from './avatar';
import { AppCreatedByResolver } from './created-by';
import { AppCurrencyResolver } from './currency';
import { AppCurrentSubscriptionContractResolver } from './current-subscription-contract';
import { AppIconResolver } from './icon';
import { AppLogoResolver } from './logo';
import { AppPhonesResolver } from './phones';
import { AppReferenceResolver } from './reference';
import { AppUpdatedByResolver } from './updated-by';

export const AppsFieldsResolvers = [
  AppReferenceResolver,
  AppCreatedByResolver,
  AppAvatarResolver,
  AppCurrencyResolver,
  AppCurrentSubscriptionContractResolver,
  AppPhonesResolver,
  AppLogoResolver,
  AppIconResolver,
  AppUpdatedByResolver
];
