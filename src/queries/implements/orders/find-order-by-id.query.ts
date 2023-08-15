import { IQuery } from '@nestjs/cqrs';

export class FindOrderByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
