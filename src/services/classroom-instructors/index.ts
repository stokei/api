import { CreateClassroomInstructorService } from './create-classroom-instructor';
import { FindAllClassroomInstructorsService } from './find-all-classroom-instructors';
import { FindClassroomInstructorByIdService } from './find-classroom-instructor-by-id';
import { RemoveClassroomInstructorService } from './remove-classroom-instructor';

export const ClassroomInstructorServices = [
  CreateClassroomInstructorService,
  RemoveClassroomInstructorService,
  FindClassroomInstructorByIdService,
  FindAllClassroomInstructorsService
];
