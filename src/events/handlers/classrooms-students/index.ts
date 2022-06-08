import { ClassroomsStudentCreatedHandler } from './classrooms-student-created.handler';
import { ClassroomsStudentUpdatedHandler } from './classrooms-student-updated.handler';
import { ClassroomsStudentRemovedHandler } from './classrooms-student-removed.handler';

export const ClassroomsStudentEventsHandlers = [
  ClassroomsStudentCreatedHandler,
  ClassroomsStudentUpdatedHandler,
  ClassroomsStudentRemovedHandler
];
