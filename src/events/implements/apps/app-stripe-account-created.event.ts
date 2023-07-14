import { AppModel } from '@/models/app.model';

interface IDataAppStripeAccountCreatedEvent {
  readonly createdBy: string;
  readonly app: AppModel;
}

export class AppStripeAccountCreatedEvent {
  readonly createdBy: string;
  readonly app: AppModel;

  constructor(data: IDataAppStripeAccountCreatedEvent) {
    this.createdBy = data.createdBy;
    this.app = data.app;
  }
}
