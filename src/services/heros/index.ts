import { CreateHeroService } from './create-hero';
import { FindAllHerosService } from './find-all-heros';
import { FindHeroByIdService } from './find-hero-by-id';
import { RemoveHeroService } from './remove-hero';
import { UpdateHeroService } from './update-hero';

export const HeroServices = [
  CreateHeroService,
  RemoveHeroService,
  UpdateHeroService,
  FindHeroByIdService,
  FindAllHerosService
];
