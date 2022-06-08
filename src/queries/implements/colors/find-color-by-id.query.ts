import { IQuery } from '@nestjs/cqrs';

export class FindColorByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
