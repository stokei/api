import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

interface IDataClassroomsEnrollmentRemovedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;
}

export class ClassroomsEnrollmentRemovedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;

  constructor(data: IDataClassroomsEnrollmentRemovedEvent) {
    this.classroomsEnrollment = data.classroomsEnrollment;
  }
}
