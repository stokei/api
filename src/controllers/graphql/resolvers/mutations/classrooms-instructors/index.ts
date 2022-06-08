import { CreateClassroomsInstructorResolver } from './create-classrooms-instructor';
import { RemoveClassroomsInstructorResolver } from './remove-classrooms-instructor';
import { UpdateClassroomsInstructorResolver } from './update-classrooms-instructor';

export const ClassroomsInstructorsMutations = [
  CreateClassroomsInstructorResolver,
  RemoveClassroomsInstructorResolver,
  UpdateClassroomsInstructorResolver
];
