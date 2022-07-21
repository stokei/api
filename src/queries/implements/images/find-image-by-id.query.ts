import { IQuery } from '@nestjs/cqrs';

export class FindImageByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
