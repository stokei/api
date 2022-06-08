import { CountLanguagesRepository } from './count-languages';
import { CreateLanguageRepository } from './create-language';
import { ExistsLanguagesRepository } from './exists-languages';
import { FindLanguageByIdRepository } from './find-language-by-id';
import { FindAllLanguagesRepository } from './find-all-languages';
import { RemoveLanguageRepository } from './remove-language';
import { UpdateLanguageRepository } from './update-language';

export const LanguagesRepositories = [
  CountLanguagesRepository,
  CreateLanguageRepository,
  ExistsLanguagesRepository,
  FindLanguageByIdRepository,
  FindAllLanguagesRepository,
  RemoveLanguageRepository,
  UpdateLanguageRepository
];
