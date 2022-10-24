import { RecurringModel } from '@/models/recurring.model';

interface IDataRecurringCreatedEvent {
  readonly createdBy: string;
  readonly recurring: RecurringModel;
}

export class RecurringCreatedEvent {
  readonly createdBy: string;
  readonly recurring: RecurringModel;

  constructor(data: IDataRecurringCreatedEvent) {
    this.createdBy = data.createdBy;
    this.recurring = data.recurring;
  }
}
