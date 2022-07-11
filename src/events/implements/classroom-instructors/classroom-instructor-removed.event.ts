import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

interface IDataClassroomInstructorRemovedEvent {
  readonly removedBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;
}

export class ClassroomInstructorRemovedEvent {
  readonly removedBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;

  constructor(data: IDataClassroomInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomInstructor = data.classroomInstructor;
  }
}
