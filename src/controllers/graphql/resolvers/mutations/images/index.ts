import { CreateImageResolver } from './create-image';
import { RemoveImageResolver } from './remove-image';

export const ImagesMutations = [RemoveImageResolver, CreateImageResolver];
