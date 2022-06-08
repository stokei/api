import { IQuery } from '@nestjs/cqrs';

export class FindCartsItemByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
