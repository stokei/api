import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

interface IDataClassroomInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;
}

export class ClassroomInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;

  constructor(data: IDataClassroomInstructorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomInstructor = data.classroomInstructor;
  }
}
