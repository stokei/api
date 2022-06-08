import { MetatagModel } from '@/models/metatag.model';

interface IDataMetatagUpdatedEvent {
  readonly metatag: MetatagModel;
}

export class MetatagUpdatedEvent {
  readonly metatag: MetatagModel;

  constructor(data: IDataMetatagUpdatedEvent) {
    this.metatag = data.metatag;
  }
}
