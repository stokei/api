import { ClassroomsEnrollmentCreatedHandler } from './classrooms-enrollment-created.handler';
import { ClassroomsEnrollmentUpdatedHandler } from './classrooms-enrollment-updated.handler';
import { ClassroomsEnrollmentRemovedHandler } from './classrooms-enrollment-removed.handler';

export const ClassroomsEnrollmentEventsHandlers = [
  ClassroomsEnrollmentCreatedHandler,
  ClassroomsEnrollmentUpdatedHandler,
  ClassroomsEnrollmentRemovedHandler
];
