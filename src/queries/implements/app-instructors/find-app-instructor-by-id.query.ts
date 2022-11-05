import { IQuery } from '@nestjs/cqrs';

export class FindAppInstructorByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
