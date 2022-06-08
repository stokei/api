import { CreateClassroomsPlanCommandHandler } from './create-classrooms-plan';
import { RemoveClassroomsPlanCommandHandler } from './remove-classrooms-plan';
import { UpdateClassroomsPlanCommandHandler } from './update-classrooms-plan';

export const ClassroomsPlanCommandHandlers = [
  CreateClassroomsPlanCommandHandler,
  RemoveClassroomsPlanCommandHandler,
  UpdateClassroomsPlanCommandHandler
];
