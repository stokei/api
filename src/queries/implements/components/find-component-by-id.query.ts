import { IQuery } from '@nestjs/cqrs';

export class FindComponentByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
