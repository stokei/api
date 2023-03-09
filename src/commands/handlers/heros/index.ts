import { CreateHeroCommandHandler } from './create-hero';
import { RemoveHeroCommandHandler } from './remove-hero';
import { UpdateHeroCommandHandler } from './update-hero';

export const HeroCommandHandlers = [
  CreateHeroCommandHandler,
  RemoveHeroCommandHandler,
  UpdateHeroCommandHandler
];
