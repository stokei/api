import { IQuery } from '@nestjs/cqrs';

export class FindQuestionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
