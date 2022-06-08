import { CreateClassroomsInstructorCommandHandler } from './create-classrooms-instructor';
import { RemoveClassroomsInstructorCommandHandler } from './remove-classrooms-instructor';
import { UpdateClassroomsInstructorCommandHandler } from './update-classrooms-instructor';

export const ClassroomsInstructorCommandHandlers = [
  CreateClassroomsInstructorCommandHandler,
  RemoveClassroomsInstructorCommandHandler,
  UpdateClassroomsInstructorCommandHandler
];
