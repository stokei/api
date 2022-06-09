import { ClassroomsPlanCreatedHandler } from './classrooms-plan-created.handler';
import { ClassroomsPlanRemovedHandler } from './classrooms-plan-removed.handler';
import { ClassroomsPlanUpdatedHandler } from './classrooms-plan-updated.handler';

export const ClassroomsPlanEventsHandlers = [
  ClassroomsPlanCreatedHandler,
  ClassroomsPlanUpdatedHandler,
  ClassroomsPlanRemovedHandler
];
