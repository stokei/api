import { CoursesAdminModel } from '@/models/courses-admin.model';

interface IDataCoursesAdminCreatedEvent {
  readonly coursesAdmin: CoursesAdminModel;
}

export class CoursesAdminCreatedEvent {
  readonly coursesAdmin: CoursesAdminModel;

  constructor(data: IDataCoursesAdminCreatedEvent) {
    this.coursesAdmin = data.coursesAdmin;
  }
}
