import { FindClassroomsInstructorByIdService } from './find-classrooms-instructor-by-id';
import { FindAllClassroomsInstructorsService } from './find-all-classrooms-instructors';
import { CreateClassroomsInstructorService } from './create-classrooms-instructor';
import { RemoveClassroomsInstructorService } from './remove-classrooms-instructor';
import { UpdateClassroomsInstructorService } from './update-classrooms-instructor';

export const ClassroomsInstructorServices = [
  CreateClassroomsInstructorService,
  RemoveClassroomsInstructorService,
  UpdateClassroomsInstructorService,
  FindClassroomsInstructorByIdService,
  FindAllClassroomsInstructorsService
];
