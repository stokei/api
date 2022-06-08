import { IQuery } from '@nestjs/cqrs';

export class FindSitesLightColorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
