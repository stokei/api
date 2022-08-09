import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Domain } from '@/controllers/graphql/types/domain';
import { DomainModel } from '@/models/domain.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Domain)
export class DomainAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Domain)
  app(@Parent() domain: DomainModel) {
    return this.findAppByIdService.execute(domain.app);
  }
}
