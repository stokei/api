import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { hiddenPrivateDataFromObject } from '@stokei/nestjs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';

import { LanguageCreatedEvent } from '@/events/implements/languages/language-created.event';
import { LanguageRemovedEvent } from '@/events/implements/languages/language-removed.event';
import { LanguageUpdatedEvent } from '@/events/implements/languages/language-updated.event';

@Injectable()
export class LanguagesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(LanguagesSagas.name);
    this.logger.log(`Saga ${LanguagesSagas.name} init`);
  }

  @Saga()
  languageCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LanguageCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [LanguageCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [LanguageCreatedEvent] Saga event languageCreated: ' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  languageRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LanguageRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [LanguageRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [LanguageRemovedEvent] Saga event languageRemoved:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };

  @Saga()
  languageUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LanguageUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [LanguageUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [LanguageUpdatedEvent] Saga event languageUpdated:' +
            JSON.stringify(
              hiddenPrivateDataFromObject(event, DEFAULT_PRIVATE_DATA)
            )
        );
        return null;
      })
    );
  };
}
