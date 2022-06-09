import { ClassroomsTagCreatedHandler } from './classrooms-tag-created.handler';
import { ClassroomsTagRemovedHandler } from './classrooms-tag-removed.handler';
import { ClassroomsTagUpdatedHandler } from './classrooms-tag-updated.handler';

export const ClassroomsTagEventsHandlers = [
  ClassroomsTagCreatedHandler,
  ClassroomsTagUpdatedHandler,
  ClassroomsTagRemovedHandler
];
