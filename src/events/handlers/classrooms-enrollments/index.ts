import { ClassroomsEnrollmentCreatedHandler } from './classrooms-enrollment-created.handler';
import { ClassroomsEnrollmentRemovedHandler } from './classrooms-enrollment-removed.handler';
import { ClassroomsEnrollmentUpdatedHandler } from './classrooms-enrollment-updated.handler';

export const ClassroomsEnrollmentEventsHandlers = [
  ClassroomsEnrollmentCreatedHandler,
  ClassroomsEnrollmentUpdatedHandler,
  ClassroomsEnrollmentRemovedHandler
];
