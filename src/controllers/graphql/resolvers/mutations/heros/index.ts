import { CreateHeroResolver } from './create-hero';
import { RemoveHeroResolver } from './remove-hero';
import { UpdateHeroResolver } from './update-hero';

export const HerosMutations = [
  CreateHeroResolver,
  RemoveHeroResolver,
  UpdateHeroResolver
];
