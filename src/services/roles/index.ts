import { CreateRoleService } from './create-role';
import { FindAllRolesService } from './find-all-roles';
import { FindRoleByIdService } from './find-role-by-id';
import { RemoveRoleService } from './remove-role';

export const RoleServices = [
  CreateRoleService,
  RemoveRoleService,
  FindRoleByIdService,
  FindAllRolesService
];
