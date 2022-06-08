import { CreateClassroomsStudentCommandHandler } from './create-classrooms-student';
import { RemoveClassroomsStudentCommandHandler } from './remove-classrooms-student';
import { UpdateClassroomsStudentCommandHandler } from './update-classrooms-student';

export const ClassroomsStudentCommandHandlers = [
  CreateClassroomsStudentCommandHandler,
  RemoveClassroomsStudentCommandHandler,
  UpdateClassroomsStudentCommandHandler
];
