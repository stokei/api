import { AppAvatarResolver } from './avatar';
import { AppCreatedByResolver } from './created-by';
import { AppCurrencyResolver } from './currency';
import { AppFaviconResolver } from './favicon';
import { AppLogoResolver } from './logo';
import { AppPhonesResolver } from './phones';
import { AppPlanResolver } from './plan';
import { AppReferenceResolver } from './reference';
import { AppUpdatedByResolver } from './updated-by';

export const AppsFieldsResolvers = [
  AppReferenceResolver,
  AppCreatedByResolver,
  AppAvatarResolver,
  AppCurrencyResolver,
  AppPlanResolver,
  AppPhonesResolver,
  AppLogoResolver,
  AppFaviconResolver,
  AppUpdatedByResolver
];
