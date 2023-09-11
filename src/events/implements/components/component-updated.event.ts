import { ComponentModel } from '@/models/component.model';

interface IDataComponentUpdatedEvent {
  readonly updatedBy: string;
  readonly component: ComponentModel;
}

export class ComponentUpdatedEvent {
  readonly updatedBy: string;
  readonly component: ComponentModel;

  constructor(data: IDataComponentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.component = data.component;
  }
}
