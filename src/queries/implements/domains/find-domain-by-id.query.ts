import { IQuery } from '@nestjs/cqrs';

export class FindDomainByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
