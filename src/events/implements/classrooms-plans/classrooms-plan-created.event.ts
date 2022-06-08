import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

interface IDataClassroomsPlanCreatedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;
}

export class ClassroomsPlanCreatedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;

  constructor(data: IDataClassroomsPlanCreatedEvent) {
    this.classroomsPlan = data.classroomsPlan;
  }
}
