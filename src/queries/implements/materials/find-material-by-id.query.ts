import { IQuery } from '@nestjs/cqrs';

export class FindMaterialByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
