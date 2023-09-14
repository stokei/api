import { IQuery } from '@nestjs/cqrs';

export class FindVersionWithComponentsQuery implements IQuery {
  constructor(readonly versionId: string) {}
}
