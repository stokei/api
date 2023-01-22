import { IQuery } from '@nestjs/cqrs';

export class FindDomainByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
