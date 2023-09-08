import { Args, Query, Resolver } from '@nestjs/graphql';

import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainNotFoundException } from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';
import { FindDomainByNameService } from '@/services/domains/find-domain-by-name';

@Resolver(() => Domain)
export class DomainResolver {
  constructor(
    private readonly domainsLoader: DomainsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService,
    private readonly findDomainByNameService: FindDomainByNameService
  ) {}

  @Query(() => Domain)
  async domain(
    @Args('id', { nullable: true }) id: string,
    @Args('name', { nullable: true }) name: string
  ) {
    let domain: DomainModel = null;
    if (id) {
      domain = await this.getOrSetCacheService.execute<DomainModel>(
        DomainResolver.name + id,
        () => this.domainsLoader.findByIds.load(id)
      );
    } else if (name) {
      domain = await this.getOrSetCacheService.execute<DomainModel>(
        DomainResolver.name + name,
        () => this.findDomainByNameService.execute(name)
      );
    }
    if (!domain) {
      throw new DomainNotFoundException();
    }
    return domain;
  }
}
