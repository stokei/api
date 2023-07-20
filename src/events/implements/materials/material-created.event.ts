import { MaterialModel } from '@/models/material.model';

interface IDataMaterialCreatedEvent {
  readonly createdBy: string;
  readonly material: MaterialModel;
}

export class MaterialCreatedEvent {
  readonly createdBy: string;
  readonly material: MaterialModel;

  constructor(data: IDataMaterialCreatedEvent) {
    this.createdBy = data.createdBy;
    this.material = data.material;
  }
}
