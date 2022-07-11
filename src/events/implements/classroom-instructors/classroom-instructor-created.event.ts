import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

interface IDataClassroomInstructorCreatedEvent {
  readonly createdBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;
}

export class ClassroomInstructorCreatedEvent {
  readonly createdBy: string;
  readonly classroomInstructor: ClassroomInstructorModel;

  constructor(data: IDataClassroomInstructorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomInstructor = data.classroomInstructor;
  }
}
