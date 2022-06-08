import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

interface IDataClassroomsMaterialRemovedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;
}

export class ClassroomsMaterialRemovedEvent {
  readonly classroomsMaterial: ClassroomsMaterialModel;

  constructor(data: IDataClassroomsMaterialRemovedEvent) {
    this.classroomsMaterial = data.classroomsMaterial;
  }
}
