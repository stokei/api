import { IQuery } from '@nestjs/cqrs';

export class FindAnswerByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
