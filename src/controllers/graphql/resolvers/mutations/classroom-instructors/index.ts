import { CreateClassroomInstructorResolver } from './create-classroom-instructor';
import { RemoveClassroomInstructorResolver } from './remove-classroom-instructor';

export const ClassroomInstructorsMutations = [
  CreateClassroomInstructorResolver,
  RemoveClassroomInstructorResolver
];
