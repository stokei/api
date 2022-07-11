import { ClassroomStudentCreatedHandler } from './classroom-student-created.handler';
import { ClassroomStudentRemovedHandler } from './classroom-student-removed.handler';
import { ClassroomStudentUpdatedHandler } from './classroom-student-updated.handler';

export const ClassroomStudentEventsHandlers = [
  ClassroomStudentCreatedHandler,
  ClassroomStudentUpdatedHandler,
  ClassroomStudentRemovedHandler
];
