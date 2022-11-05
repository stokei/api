import { AppInstructorModel } from '@/models/app-instructor.model';

interface IDataAppInstructorRemovedEvent {
  readonly removedBy: string;
  readonly appInstructor: AppInstructorModel;
}

export class AppInstructorRemovedEvent {
  readonly removedBy: string;
  readonly appInstructor: AppInstructorModel;

  constructor(data: IDataAppInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.appInstructor = data.appInstructor;
  }
}
