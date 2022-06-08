import { CreateClassroomsEnrollmentCommandHandler } from './create-classrooms-enrollment';
import { RemoveClassroomsEnrollmentCommandHandler } from './remove-classrooms-enrollment';
import { UpdateClassroomsEnrollmentCommandHandler } from './update-classrooms-enrollment';

export const ClassroomsEnrollmentCommandHandlers = [
  CreateClassroomsEnrollmentCommandHandler,
  RemoveClassroomsEnrollmentCommandHandler,
  UpdateClassroomsEnrollmentCommandHandler
];
