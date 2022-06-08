import { IQuery } from '@nestjs/cqrs';

export class FindVideosSubtitleByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
