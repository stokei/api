import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

interface IDataClassroomsPlanUpdatedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;
}

export class ClassroomsPlanUpdatedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;

  constructor(data: IDataClassroomsPlanUpdatedEvent) {
    this.classroomsPlan = data.classroomsPlan;
  }
}
