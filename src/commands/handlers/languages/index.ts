import { CreateLanguageCommandHandler } from './create-language';
import { RemoveLanguageCommandHandler } from './remove-language';
import { UpdateLanguageCommandHandler } from './update-language';

export const LanguageCommandHandlers = [
  CreateLanguageCommandHandler,
  RemoveLanguageCommandHandler,
  UpdateLanguageCommandHandler
];
