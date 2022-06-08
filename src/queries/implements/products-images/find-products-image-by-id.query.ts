import { IQuery } from '@nestjs/cqrs';

export class FindProductsImageByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
