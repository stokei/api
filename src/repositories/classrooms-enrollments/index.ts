import { CountClassroomsEnrollmentsRepository } from './count-classrooms-enrollments';
import { CreateClassroomsEnrollmentRepository } from './create-classrooms-enrollment';
import { ExistsClassroomsEnrollmentsRepository } from './exists-classrooms-enrollments';
import { FindAllClassroomsEnrollmentsRepository } from './find-all-classrooms-enrollments';
import { FindClassroomsEnrollmentByIdRepository } from './find-classrooms-enrollment-by-id';
import { RemoveClassroomsEnrollmentRepository } from './remove-classrooms-enrollment';
import { UpdateClassroomsEnrollmentRepository } from './update-classrooms-enrollment';

export const ClassroomsEnrollmentsRepositories = [
  CountClassroomsEnrollmentsRepository,
  CreateClassroomsEnrollmentRepository,
  ExistsClassroomsEnrollmentsRepository,
  FindClassroomsEnrollmentByIdRepository,
  FindAllClassroomsEnrollmentsRepository,
  RemoveClassroomsEnrollmentRepository,
  UpdateClassroomsEnrollmentRepository
];
