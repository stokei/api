import { MaterialModel } from '@/models/material.model';

interface IDataMaterialUpdatedEvent {
  readonly updatedBy: string;
  readonly material: MaterialModel;
}

export class MaterialUpdatedEvent {
  readonly updatedBy: string;
  readonly material: MaterialModel;

  constructor(data: IDataMaterialUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.material = data.material;
  }
}
