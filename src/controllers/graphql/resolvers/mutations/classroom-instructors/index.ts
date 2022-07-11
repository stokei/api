import { CreateClassroomInstructorResolver } from './create-classroom-instructor';
import { RemoveClassroomInstructorResolver } from './remove-classroom-instructor';
import { UpdateClassroomInstructorResolver } from './update-classroom-instructor';

export const ClassroomInstructorsMutations = [
  CreateClassroomInstructorResolver,
  RemoveClassroomInstructorResolver,
  UpdateClassroomInstructorResolver
];
