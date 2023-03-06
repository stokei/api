import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllRolesService } from '@/services/roles/find-all-roles';

@Injectable({ scope: Scope.REQUEST })
export class RolesLoader {
  constructor(private readonly rolesService: FindAllRolesService) {}

  readonly findByIds = new DataLoader(async (roleIds: string[]) => {
    const roles = await this.rolesService.execute({
      where: {
        AND: {
          ids: roleIds
        }
      }
    });
    const rolesMap = new Map(roles?.items?.map((role) => [role.id, role]));
    return roleIds.map((roleId) => rolesMap.get(roleId));
  });
}
