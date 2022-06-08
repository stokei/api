import { IQuery } from '@nestjs/cqrs';

export class FindDomainByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
