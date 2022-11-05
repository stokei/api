import { CreateAppInstructorResolver } from './create-app-instructor';
import { RemoveAppInstructorResolver } from './remove-app-instructor';

export const AppInstructorsMutations = [
  CreateAppInstructorResolver,
  RemoveAppInstructorResolver
];
