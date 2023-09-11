import { FindAllComponentsQueryHandler } from './find-all-components';
import { FindAllComponentsByParentIdsQueryHandler } from './find-all-components-by-parent-ids';
import { FindComponentByIdQueryHandler } from './find-component-by-id';

export const ComponentQueriesHandlers = [
  FindComponentByIdQueryHandler,
  FindAllComponentsQueryHandler,
  FindAllComponentsByParentIdsQueryHandler
];
