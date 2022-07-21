import { IQuery } from '@nestjs/cqrs';

export class FindAddressByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
