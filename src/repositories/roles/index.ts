import { CountRolesRepository } from './count-roles';
import { CreateRoleRepository } from './create-role';
import { FindAllRolesRepository } from './find-all-roles';
import { FindRoleByIdRepository } from './find-role-by-id';
import { RemoveRoleRepository } from './remove-role';

export const RolesRepositories = [
  CountRolesRepository,
  CreateRoleRepository,
  FindRoleByIdRepository,
  FindAllRolesRepository,
  RemoveRoleRepository
];
