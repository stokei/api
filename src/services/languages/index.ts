import { CreateLanguageService } from './create-language';
import { FindAllLanguagesService } from './find-all-languages';
import { FindLanguageByIdService } from './find-language-by-id';
import { RemoveLanguageService } from './remove-language';
import { UpdateLanguageService } from './update-language';

export const LanguageServices = [
  CreateLanguageService,
  RemoveLanguageService,
  UpdateLanguageService,
  FindLanguageByIdService,
  FindAllLanguagesService
];
