import { CreateClassroomsTagCommandHandler } from './create-classrooms-tag';
import { RemoveClassroomsTagCommandHandler } from './remove-classrooms-tag';
import { UpdateClassroomsTagCommandHandler } from './update-classrooms-tag';

export const ClassroomsTagCommandHandlers = [
  CreateClassroomsTagCommandHandler,
  RemoveClassroomsTagCommandHandler,
  UpdateClassroomsTagCommandHandler
];
