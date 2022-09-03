import { AppAvatarResolver } from './avatar';
import { AppCreatedByResolver } from './created-by';
import { AppCurrencyResolver } from './currency';
import { AppCurrentSubscriptionPlanResolver } from './current-subscription-plan';
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
  AppCurrentSubscriptionPlanResolver,
  AppPhonesResolver,
  AppLogoResolver,
  AppIconResolver,
  AppUpdatedByResolver
];
