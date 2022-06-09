import { CountCoursesInstructorsRepository } from './count-courses-instructors';
import { CreateCoursesInstructorRepository } from './create-courses-instructor';
import { ExistsCoursesInstructorsRepository } from './exists-courses-instructors';
import { FindAllCoursesInstructorsRepository } from './find-all-courses-instructors';
import { FindCoursesInstructorByIdRepository } from './find-courses-instructor-by-id';
import { RemoveCoursesInstructorRepository } from './remove-courses-instructor';
import { UpdateCoursesInstructorRepository } from './update-courses-instructor';

export const CoursesInstructorsRepositories = [
  CountCoursesInstructorsRepository,
  CreateCoursesInstructorRepository,
  ExistsCoursesInstructorsRepository,
  FindCoursesInstructorByIdRepository,
  FindAllCoursesInstructorsRepository,
  RemoveCoursesInstructorRepository,
  UpdateCoursesInstructorRepository
];
