import { CountLanguagesRepository } from './count-languages';
import { CreateLanguageRepository } from './create-language';
import { FindAllLanguagesRepository } from './find-all-languages';
import { FindLanguageByIdRepository } from './find-language-by-id';
import { RemoveLanguageRepository } from './remove-language';
import { UpdateLanguageRepository } from './update-language';

export const LanguagesRepositories = [
  CountLanguagesRepository,
  CreateLanguageRepository,
  FindLanguageByIdRepository,
  FindAllLanguagesRepository,
  RemoveLanguageRepository,
  UpdateLanguageRepository
];
