import { CountAppInstructorsRepository } from './count-app-instructors';
import { CreateAppInstructorRepository } from './create-app-instructor';
import { ExistsAppInstructorsRepository } from './exists-app-instructors';
import { FindAllAppInstructorsRepository } from './find-all-app-instructors';
import { FindAppInstructorByIdRepository } from './find-app-instructor-by-id';
import { RemoveAppInstructorRepository } from './remove-app-instructor';

export const AppInstructorsRepositories = [
  CountAppInstructorsRepository,
  CreateAppInstructorRepository,
  ExistsAppInstructorsRepository,
  FindAppInstructorByIdRepository,
  FindAllAppInstructorsRepository,
  RemoveAppInstructorRepository
];
