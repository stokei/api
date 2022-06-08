import { CreateClassroomCommandHandler } from './create-classroom';
import { RemoveClassroomCommandHandler } from './remove-classroom';
import { UpdateClassroomCommandHandler } from './update-classroom';

export const ClassroomCommandHandlers = [
  CreateClassroomCommandHandler,
  RemoveClassroomCommandHandler,
  UpdateClassroomCommandHandler
];
