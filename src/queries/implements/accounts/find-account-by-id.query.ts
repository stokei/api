import { IQuery } from '@nestjs/cqrs';

export class FindAccountByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
