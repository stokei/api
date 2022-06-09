import { FindAllClassroomsPlansQueryHandler } from './find-all-classrooms-plans';
import { FindClassroomsPlanByIdQueryHandler } from './find-classrooms-plan-by-id';

export const ClassroomsPlanQueriesHandlers = [
  FindClassroomsPlanByIdQueryHandler,
  FindAllClassroomsPlansQueryHandler
];
