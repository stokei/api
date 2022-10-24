import { RecurringModel } from '@/models/recurring.model';

interface IDataRecurringRemovedEvent {
  readonly removedBy: string;
  readonly recurring: RecurringModel;
}

export class RecurringRemovedEvent {
  readonly removedBy: string;
  readonly recurring: RecurringModel;

  constructor(data: IDataRecurringRemovedEvent) {
    this.removedBy = data.removedBy;
    this.recurring = data.recurring;
  }
}
