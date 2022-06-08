import { CoursesAdminModel } from '@/models/courses-admin.model';

interface IDataCoursesAdminRemovedEvent {
  readonly coursesAdmin: CoursesAdminModel;
}

export class CoursesAdminRemovedEvent {
  readonly coursesAdmin: CoursesAdminModel;

  constructor(data: IDataCoursesAdminRemovedEvent) {
    this.coursesAdmin = data.coursesAdmin;
  }
}
