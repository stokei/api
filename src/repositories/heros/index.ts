import { CountHerosRepository } from './count-heros';
import { CreateHeroRepository } from './create-hero';
import { FindAllHerosRepository } from './find-all-heros';
import { FindHeroByIdRepository } from './find-hero-by-id';
import { RemoveHeroRepository } from './remove-hero';
import { UpdateHeroRepository } from './update-hero';

export const HerosRepositories = [
  CountHerosRepository,
  CreateHeroRepository,
  FindHeroByIdRepository,
  FindAllHerosRepository,
  RemoveHeroRepository,
  UpdateHeroRepository
];
