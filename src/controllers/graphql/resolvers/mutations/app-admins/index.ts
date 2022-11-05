import { CreateAppAdminResolver } from './create-app-admin';
import { RemoveAppAdminResolver } from './remove-app-admin';

export const AppAdminsMutations = [
  CreateAppAdminResolver,
  RemoveAppAdminResolver
];
