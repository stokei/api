import { AppAvatarResolver } from './avatar';
import { AppColorsResolver } from './colors';
import { AppCreatedByResolver } from './created-by';
import { AppCurrencyResolver } from './currency';
import { AppCurrentSubscriptionContractResolver } from './current-subscription-contract';
import { AppDefaultDomainResolver } from './default-domain';
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
  AppColorsResolver,
  AppUpdatedByResolver,
  AppDefaultDomainResolver
];
