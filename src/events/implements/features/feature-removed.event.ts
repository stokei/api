import { FeatureModel } from '@/models/feature.model';

interface IDataFeatureRemovedEvent {
  readonly removedBy: string;
  readonly feature: FeatureModel;
}

export class FeatureRemovedEvent {
  readonly removedBy: string;
  readonly feature: FeatureModel;

  constructor(data: IDataFeatureRemovedEvent) {
    this.removedBy = data.removedBy;
    this.feature = data.feature;
  }
}
