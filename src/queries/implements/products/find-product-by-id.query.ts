import { IQuery } from '@nestjs/cqrs';

export class FindProductByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
