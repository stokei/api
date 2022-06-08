import { IQuery } from '@nestjs/cqrs';

export class FindImageByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
