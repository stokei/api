import { MetatagModel } from '@/models/metatag.model';

interface IDataMetatagCreatedEvent {
  readonly metatag: MetatagModel;
}

export class MetatagCreatedEvent {
  readonly metatag: MetatagModel;

  constructor(data: IDataMetatagCreatedEvent) {
    this.metatag = data.metatag;
  }
}
