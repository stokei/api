import { IQuery } from '@nestjs/cqrs';

export class FindActivityByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
