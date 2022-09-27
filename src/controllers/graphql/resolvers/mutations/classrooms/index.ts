import { ActivateClassroomResolver } from './activate-classroom';
import { CreateClassroomResolver } from './create-classroom';
import { DeactivateClassroomResolver } from './deactivate-classroom';
import { UpdateClassroomResolver } from './update-classroom';

export const ClassroomsMutations = [
  CreateClassroomResolver,
  UpdateClassroomResolver,
  DeactivateClassroomResolver,
  ActivateClassroomResolver
];
