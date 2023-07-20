import { MaterialModel } from '@/models/material.model';

interface IDataMaterialRemovedEvent {
  readonly removedBy: string;
  readonly material: MaterialModel;
}

export class MaterialRemovedEvent {
  readonly removedBy: string;
  readonly material: MaterialModel;

  constructor(data: IDataMaterialRemovedEvent) {
    this.removedBy = data.removedBy;
    this.material = data.material;
  }
}
