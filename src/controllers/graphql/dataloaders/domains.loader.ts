import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllDomainsService } from '@/services/domains/find-all-domains';

@Injectable({ scope: Scope.REQUEST })
export class DomainsLoader {
  constructor(private readonly domainsService: FindAllDomainsService) {}

  readonly findByIds = new DataLoader(async (domainIds: string[]) => {
    const domains = await this.domainsService.execute({
      where: {
        AND: {
          ids: domainIds
        }
      }
    });
    const domainsMap = new Map(
      domains?.items?.map((domain) => [domain.id, domain])
    );
    return domainIds.map((domainId) => domainsMap.get(domainId));
  });
}
