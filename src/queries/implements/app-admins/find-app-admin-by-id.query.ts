import { IQuery } from '@nestjs/cqrs';

export class FindAppAdminByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
