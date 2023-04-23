import { IQuery } from '@nestjs/cqrs';

export class FindFileByFilenameQuery implements IQuery {
  constructor(readonly filename: string) {}
}
