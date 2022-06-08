import { IQuery } from '@nestjs/cqrs';

export class FindModulesVideoByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
