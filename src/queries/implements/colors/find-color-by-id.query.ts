import { IQuery } from '@nestjs/cqrs';

export class FindColorByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
