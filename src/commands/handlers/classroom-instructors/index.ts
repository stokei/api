import { CreateClassroomInstructorCommandHandler } from './create-classroom-instructor';
import { RemoveClassroomInstructorCommandHandler } from './remove-classroom-instructor';

export const ClassroomInstructorCommandHandlers = [
  CreateClassroomInstructorCommandHandler,
  RemoveClassroomInstructorCommandHandler
];
