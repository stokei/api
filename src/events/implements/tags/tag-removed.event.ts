import { TagModel } from '@/models/tag.model';

interface IDataTagRemovedEvent {
  readonly tag: TagModel;
}

export class TagRemovedEvent {
  readonly tag: TagModel;

  constructor(data: IDataTagRemovedEvent) {
    this.tag = data.tag;
  }
}
