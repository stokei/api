import { IQuery } from '@nestjs/cqrs';

export class FindOrderByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
