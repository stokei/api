import { CreateMetatagCommandHandler } from './create-metatag';
import { RemoveMetatagCommandHandler } from './remove-metatag';
import { UpdateMetatagCommandHandler } from './update-metatag';

export const MetatagCommandHandlers = [
  CreateMetatagCommandHandler,
  RemoveMetatagCommandHandler,
  UpdateMetatagCommandHandler
];
