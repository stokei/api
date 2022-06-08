import { ClassroomsPlanCreatedHandler } from './classrooms-plan-created.handler';
import { ClassroomsPlanUpdatedHandler } from './classrooms-plan-updated.handler';
import { ClassroomsPlanRemovedHandler } from './classrooms-plan-removed.handler';

export const ClassroomsPlanEventsHandlers = [
  ClassroomsPlanCreatedHandler,
  ClassroomsPlanUpdatedHandler,
  ClassroomsPlanRemovedHandler
];
