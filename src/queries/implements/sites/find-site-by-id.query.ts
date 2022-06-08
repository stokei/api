import { IQuery } from '@nestjs/cqrs';

export class FindSiteByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
