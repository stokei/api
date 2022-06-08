import { CreateClassroomsMaterialResolver } from './create-classrooms-material';
import { RemoveClassroomsMaterialResolver } from './remove-classrooms-material';
import { UpdateClassroomsMaterialResolver } from './update-classrooms-material';

export const ClassroomsMaterialsMutations = [
  CreateClassroomsMaterialResolver,
  RemoveClassroomsMaterialResolver,
  UpdateClassroomsMaterialResolver
];
