import { CreateAppInstructorService } from './create-app-instructor';
import { FindAllAppInstructorsService } from './find-all-app-instructors';
import { FindAppInstructorByIdService } from './find-app-instructor-by-id';
import { RemoveAppInstructorService } from './remove-app-instructor';

export const AppInstructorServices = [
  CreateAppInstructorService,
  RemoveAppInstructorService,
  FindAppInstructorByIdService,
  FindAllAppInstructorsService
];
