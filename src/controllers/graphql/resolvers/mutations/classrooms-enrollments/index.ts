import { CreateClassroomsEnrollmentResolver } from './create-classrooms-enrollment';
import { RemoveClassroomsEnrollmentResolver } from './remove-classrooms-enrollment';
import { UpdateClassroomsEnrollmentResolver } from './update-classrooms-enrollment';

export const ClassroomsEnrollmentsMutations = [
  CreateClassroomsEnrollmentResolver,
  RemoveClassroomsEnrollmentResolver,
  UpdateClassroomsEnrollmentResolver
];
