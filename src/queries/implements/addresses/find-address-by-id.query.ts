import { IQuery } from '@nestjs/cqrs';

export class FindAddressByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
