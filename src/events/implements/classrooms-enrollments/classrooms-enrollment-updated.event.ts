import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

interface IDataClassroomsEnrollmentUpdatedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;
}

export class ClassroomsEnrollmentUpdatedEvent {
  readonly classroomsEnrollment: ClassroomsEnrollmentModel;

  constructor(data: IDataClassroomsEnrollmentUpdatedEvent) {
    this.classroomsEnrollment = data.classroomsEnrollment;
  }
}
