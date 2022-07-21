import { IQuery } from '@nestjs/cqrs';

export class FindProductByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
