import { IQuery } from '@nestjs/cqrs';

export class FindModuleByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
