import { CreateClassroomsMaterialCommandHandler } from './create-classrooms-material';
import { RemoveClassroomsMaterialCommandHandler } from './remove-classrooms-material';
import { UpdateClassroomsMaterialCommandHandler } from './update-classrooms-material';

export const ClassroomsMaterialCommandHandlers = [
  CreateClassroomsMaterialCommandHandler,
  RemoveClassroomsMaterialCommandHandler,
  UpdateClassroomsMaterialCommandHandler
];
