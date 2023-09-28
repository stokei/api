import { IQuery } from '@nestjs/cqrs';

export class FindSiteBySlugQuery implements IQuery {
  constructor(readonly slug: string) {}
}
