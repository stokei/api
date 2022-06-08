import { IQuery } from '@nestjs/cqrs';

export class FindSitesDarkColorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
