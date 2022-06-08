import { MetatagModel } from '@/models/metatag.model';

interface IDataMetatagRemovedEvent {
  readonly metatag: MetatagModel;
}

export class MetatagRemovedEvent {
  readonly metatag: MetatagModel;

  constructor(data: IDataMetatagRemovedEvent) {
    this.metatag = data.metatag;
  }
}
