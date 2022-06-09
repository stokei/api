import { FindAllClassroomsEnrollmentsQueryHandler } from './find-all-classrooms-enrollments';
import { FindClassroomsEnrollmentByIdQueryHandler } from './find-classrooms-enrollment-by-id';

export const ClassroomsEnrollmentQueriesHandlers = [
  FindClassroomsEnrollmentByIdQueryHandler,
  FindAllClassroomsEnrollmentsQueryHandler
];
