import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

interface IDataClassroomsPlanRemovedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;
}

export class ClassroomsPlanRemovedEvent {
  readonly classroomsPlan: ClassroomsPlanModel;

  constructor(data: IDataClassroomsPlanRemovedEvent) {
    this.classroomsPlan = data.classroomsPlan;
  }
}
