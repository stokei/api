import { IQuery } from '@nestjs/cqrs';

export class FindProductComboItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
