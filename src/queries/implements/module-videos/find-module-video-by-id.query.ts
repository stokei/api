import { IQuery } from '@nestjs/cqrs';

export class FindModuleVideoByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
