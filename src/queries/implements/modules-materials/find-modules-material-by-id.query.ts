import { IQuery } from '@nestjs/cqrs';

export class FindModulesMaterialByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
