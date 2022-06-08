import { FindCoursesInstructorByIdService } from './find-courses-instructor-by-id';
import { FindAllCoursesInstructorsService } from './find-all-courses-instructors';
import { CreateCoursesInstructorService } from './create-courses-instructor';
import { RemoveCoursesInstructorService } from './remove-courses-instructor';
import { UpdateCoursesInstructorService } from './update-courses-instructor';

export const CoursesInstructorServices = [
  CreateCoursesInstructorService,
  RemoveCoursesInstructorService,
  UpdateCoursesInstructorService,
  FindCoursesInstructorByIdService,
  FindAllCoursesInstructorsService
];
