import { AppAdminAdminResolver } from './admin';
import { AppAdminAppResolver } from './app';
import { AppAdminCreatedByResolver } from './created-by';
import { AppAdminReferenceResolver } from './reference';
import { AppAdminUpdatedByResolver } from './updated-by';

export const AppAdminsFieldsResolvers = [
  AppAdminReferenceResolver,
  AppAdminAppResolver,
  AppAdminAdminResolver,
  AppAdminCreatedByResolver,
  AppAdminUpdatedByResolver
];
