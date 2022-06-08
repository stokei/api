import { ClassroomsTagCreatedHandler } from './classrooms-tag-created.handler';
import { ClassroomsTagUpdatedHandler } from './classrooms-tag-updated.handler';
import { ClassroomsTagRemovedHandler } from './classrooms-tag-removed.handler';

export const ClassroomsTagEventsHandlers = [
  ClassroomsTagCreatedHandler,
  ClassroomsTagUpdatedHandler,
  ClassroomsTagRemovedHandler
];
