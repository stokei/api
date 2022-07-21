import { IQuery } from '@nestjs/cqrs';

export class FindLanguageByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
