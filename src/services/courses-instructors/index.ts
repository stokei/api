import { CreateCoursesInstructorService } from './create-courses-instructor';
import { FindAllCoursesInstructorsService } from './find-all-courses-instructors';
import { FindCoursesInstructorByIdService } from './find-courses-instructor-by-id';
import { RemoveCoursesInstructorService } from './remove-courses-instructor';
import { UpdateCoursesInstructorService } from './update-courses-instructor';

export const CoursesInstructorServices = [
  CreateCoursesInstructorService,
  RemoveCoursesInstructorService,
  UpdateCoursesInstructorService,
  FindCoursesInstructorByIdService,
  FindAllCoursesInstructorsService
];
