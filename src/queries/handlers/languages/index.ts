import { FindAllLanguagesQueryHandler } from './find-all-languages';
import { FindLanguageByIdQueryHandler } from './find-language-by-id';

export const LanguageQueriesHandlers = [
  FindLanguageByIdQueryHandler,
  FindAllLanguagesQueryHandler
];
