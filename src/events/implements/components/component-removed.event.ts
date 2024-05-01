import { ComponentModel } from '@/models/component.model';

interface IDataComponentRemovedEvent {
  readonly removedBy: string;
  readonly component: ComponentModel;
}

export class ComponentRemovedEvent {
  readonly removedBy: string;
  readonly component: ComponentModel;

  constructor(data: IDataComponentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.component = data.component;
  }
}
