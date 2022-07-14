import { CreateClassroomStudentCommandHandler } from './create-classroom-student';
import { RemoveClassroomStudentCommandHandler } from './remove-classroom-student';

export const ClassroomStudentCommandHandlers = [
  CreateClassroomStudentCommandHandler,
  RemoveClassroomStudentCommandHandler
];
