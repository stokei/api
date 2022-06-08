import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

interface IDataClassroomsMaterialUpdatedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;
}

export class ClassroomsMaterialUpdatedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;

  constructor(data: IDataClassroomsMaterialUpdatedEvent) {
    this.classroomsMaterial = data.classroomsMaterial;
  }
}
