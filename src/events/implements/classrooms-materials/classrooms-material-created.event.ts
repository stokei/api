import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

interface IDataClassroomsMaterialCreatedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;
}

export class ClassroomsMaterialCreatedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;

  constructor(data: IDataClassroomsMaterialCreatedEvent) {
    this.classroomsMaterial = data.classroomsMaterial;
  }
}
