import { FeatureModel } from '@/models/feature.model';

interface IDataFeatureUpdatedEvent {
  readonly updatedBy: string;
  readonly feature: FeatureModel;
}

export class FeatureUpdatedEvent {
  readonly updatedBy: string;
  readonly feature: FeatureModel;

  constructor(data: IDataFeatureUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.feature = data.feature;
  }
}
