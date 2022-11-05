import { AppInstructorModel } from '@/models/app-instructor.model';

interface IDataAppInstructorCreatedEvent {
  readonly createdBy: string;
  readonly appInstructor: AppInstructorModel;
}

export class AppInstructorCreatedEvent {
  readonly createdBy: string;
  readonly appInstructor: AppInstructorModel;

  constructor(data: IDataAppInstructorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.appInstructor = data.appInstructor;
  }
}
