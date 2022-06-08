import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

interface IDataClassroomsEnrollmentCreatedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;
}

export class ClassroomsEnrollmentCreatedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;

  constructor(data: IDataClassroomsEnrollmentCreatedEvent) {
    this.classroomsEnrollment = data.classroomsEnrollment;
  }
}
