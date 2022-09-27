import { ActivateClassroomCommandHandler } from './activate-classroom';
import { CreateClassroomCommandHandler } from './create-classroom';
import { DeactivateClassroomCommandHandler } from './deactivate-classroom';
import { UpdateClassroomCommandHandler } from './update-classroom';

export const ClassroomCommandHandlers = [
  CreateClassroomCommandHandler,
  UpdateClassroomCommandHandler,
  ActivateClassroomCommandHandler,
  DeactivateClassroomCommandHandler
];
