import { CreateClassroomsTagResolver } from './create-classrooms-tag';
import { RemoveClassroomsTagResolver } from './remove-classrooms-tag';
import { UpdateClassroomsTagResolver } from './update-classrooms-tag';

export const ClassroomsTagsMutations = [
  CreateClassroomsTagResolver,
  RemoveClassroomsTagResolver,
  UpdateClassroomsTagResolver
];
