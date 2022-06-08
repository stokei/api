import { TagModel } from '@/models/tag.model';

interface IDataTagCreatedEvent {
  readonly tag: TagModel;
}

export class TagCreatedEvent {
  readonly tag: TagModel;

  constructor(data: IDataTagCreatedEvent) {
    this.tag = data.tag;
  }
}
