import { IQuery } from '@nestjs/cqrs';

export class FindPageByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
