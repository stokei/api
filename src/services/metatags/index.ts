import { FindMetatagByIdService } from './find-metatag-by-id';
import { FindAllMetatagsService } from './find-all-metatags';
import { CreateMetatagService } from './create-metatag';
import { RemoveMetatagService } from './remove-metatag';
import { UpdateMetatagService } from './update-metatag';

export const MetatagServices = [
  CreateMetatagService,
  RemoveMetatagService,
  UpdateMetatagService,
  FindMetatagByIdService,
  FindAllMetatagsService
];
