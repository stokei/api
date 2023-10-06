import { IQuery } from '@nestjs/cqrs';

export class FindSiteCurrentDomainQuery implements IQuery {
  constructor(readonly siteId: string) {}
}
