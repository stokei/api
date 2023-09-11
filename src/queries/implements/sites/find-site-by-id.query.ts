import { IQuery } from '@nestjs/cqrs';

export class FindSiteByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
