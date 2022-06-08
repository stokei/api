import { FindClassroomsEnrollmentByIdService } from './find-classrooms-enrollment-by-id';
import { FindAllClassroomsEnrollmentsService } from './find-all-classrooms-enrollments';
import { CreateClassroomsEnrollmentService } from './create-classrooms-enrollment';
import { RemoveClassroomsEnrollmentService } from './remove-classrooms-enrollment';
import { UpdateClassroomsEnrollmentService } from './update-classrooms-enrollment';

export const ClassroomsEnrollmentServices = [
  CreateClassroomsEnrollmentService,
  RemoveClassroomsEnrollmentService,
  UpdateClassroomsEnrollmentService,
  FindClassroomsEnrollmentByIdService,
  FindAllClassroomsEnrollmentsService
];
