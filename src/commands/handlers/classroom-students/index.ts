import { CreateClassroomStudentCommandHandler } from './create-classroom-student';
import { RemoveClassroomStudentCommandHandler } from './remove-classroom-student';
import { UpdateClassroomStudentCommandHandler } from './update-classroom-student';

export const ClassroomStudentCommandHandlers = [
  CreateClassroomStudentCommandHandler,
  RemoveClassroomStudentCommandHandler,
  UpdateClassroomStudentCommandHandler
];
