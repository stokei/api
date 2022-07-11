import { CreateClassroomInstructorCommandHandler } from './create-classroom-instructor';
import { RemoveClassroomInstructorCommandHandler } from './remove-classroom-instructor';
import { UpdateClassroomInstructorCommandHandler } from './update-classroom-instructor';

export const ClassroomInstructorCommandHandlers = [
  CreateClassroomInstructorCommandHandler,
  RemoveClassroomInstructorCommandHandler,
  UpdateClassroomInstructorCommandHandler
];
