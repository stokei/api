import { CoursesAdminModel } from '@/models/courses-admin.model';

interface IDataCoursesAdminUpdatedEvent {
  readonly coursesAdmin: CoursesAdminModel;
}

export class CoursesAdminUpdatedEvent {
  readonly coursesAdmin: CoursesAdminModel;

  constructor(data: IDataCoursesAdminUpdatedEvent) {
    this.coursesAdmin = data.coursesAdmin;
  }
}
