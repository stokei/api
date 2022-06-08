import { TagModel } from '@/models/tag.model';

interface IDataTagUpdatedEvent {
  readonly tag: TagModel;
}

export class TagUpdatedEvent {
  readonly tag: TagModel;

  constructor(data: IDataTagUpdatedEvent) {
    this.tag = data.tag;
  }
}
