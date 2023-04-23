import { Resolver, ResolveReference } from '@nestjs/graphql';

import { RolesLoader } from '@/controllers/graphql/dataloaders/roles.loader';
import { Role } from '@/controllers/graphql/types/role';

@Resolver(() => Role)
export class RoleReferenceResolver {
  constructor(private readonly rolesLoader: RolesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.rolesLoader.findByIds.load(reference.id);
  }
}
