import { Args, Query, Resolver } from '@nestjs/graphql';

import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainNotFoundException } from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindDomainByNameService } from '@/services/domains/find-domain-by-name';

@Resolver(() => Domain)
export class DomainResolver {
  constructor(
    private readonly domainsLoader: DomainsLoader,
    private readonly findDomainByNameService: FindDomainByNameService
  ) {}

  @Query(() => Domain)
  async domain(
    @Args('id', { nullable: true }) id: string,
    @Args('name', { nullable: true }) name: string
  ) {
    let domain: DomainModel = null;
    if (id) {
      domain = await this.domainsLoader.findByIds.load(id);
    }
    if (name) {
      domain = await this.findDomainByNameService.execute(name);
    }
    if (!domain) {
      throw new DomainNotFoundException();
    }
    return domain;
  }
}
