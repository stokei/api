import { ClassroomsStudentCreatedHandler } from './classrooms-student-created.handler';
import { ClassroomsStudentRemovedHandler } from './classrooms-student-removed.handler';
import { ClassroomsStudentUpdatedHandler } from './classrooms-student-updated.handler';

export const ClassroomsStudentEventsHandlers = [
  ClassroomsStudentCreatedHandler,
  ClassroomsStudentUpdatedHandler,
  ClassroomsStudentRemovedHandler
];
