import { CreateClassroomsInstructorService } from './create-classrooms-instructor';
import { FindAllClassroomsInstructorsService } from './find-all-classrooms-instructors';
import { FindClassroomsInstructorByIdService } from './find-classrooms-instructor-by-id';
import { RemoveClassroomsInstructorService } from './remove-classrooms-instructor';
import { UpdateClassroomsInstructorService } from './update-classrooms-instructor';

export const ClassroomsInstructorServices = [
  CreateClassroomsInstructorService,
  RemoveClassroomsInstructorService,
  UpdateClassroomsInstructorService,
  FindClassroomsInstructorByIdService,
  FindAllClassroomsInstructorsService
];
