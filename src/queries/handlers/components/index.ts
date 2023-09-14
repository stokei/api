import { FindAllComponentsQueryHandler } from './find-all-components';
import { FindAllComponentsByParentIdsQueryHandler } from './find-all-components-by-parent-ids';
import { FindAllComponentsTreeQueryHandler } from './find-all-components-tree';
import { FindAllComponentsWithComponentsChildrenQueryHandler } from './find-all-components-with-components-children';
import { FindComponentByIdQueryHandler } from './find-component-by-id';

export const ComponentQueriesHandlers = [
  FindComponentByIdQueryHandler,
  FindAllComponentsQueryHandler,
  FindAllComponentsByParentIdsQueryHandler,
  FindAllComponentsWithComponentsChildrenQueryHandler,
  FindAllComponentsTreeQueryHandler
];
