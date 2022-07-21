import { IQuery } from '@nestjs/cqrs';

export class FindVideoAuthorByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
