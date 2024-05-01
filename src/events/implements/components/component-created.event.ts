import { ComponentModel } from '@/models/component.model';

interface IDataComponentCreatedEvent {
  readonly createdBy: string;
  readonly component: ComponentModel;
}

export class ComponentCreatedEvent {
  readonly createdBy: string;
  readonly component: ComponentModel;

  constructor(data: IDataComponentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.component = data.component;
  }
}
