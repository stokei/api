import { CreateClassroomResolver } from './create-classroom';
import { RemoveClassroomResolver } from './remove-classroom';
import { UpdateClassroomResolver } from './update-classroom';

export const ClassroomsMutations = [
  CreateClassroomResolver,
  RemoveClassroomResolver,
  UpdateClassroomResolver
];
