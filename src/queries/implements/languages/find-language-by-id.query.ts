import { IQuery } from '@nestjs/cqrs';

export class FindLanguageByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
