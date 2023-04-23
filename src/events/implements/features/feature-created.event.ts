import { FeatureModel } from '@/models/feature.model';

interface IDataFeatureCreatedEvent {
  readonly createdBy: string;
  readonly feature: FeatureModel;
}

export class FeatureCreatedEvent {
  readonly createdBy: string;
  readonly feature: FeatureModel;

  constructor(data: IDataFeatureCreatedEvent) {
    this.createdBy = data.createdBy;
    this.feature = data.feature;
  }
}
