import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { TagCreatedEvent } from '@/events/implements/tags/tag-created.event';
import { TagRemovedEvent } from '@/events/implements/tags/tag-removed.event';
import { TagUpdatedEvent } from '@/events/implements/tags/tag-updated.event';

@Injectable()
export class TagsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(TagsSagas.name);
    this.logger.log(`Saga ${TagsSagas.name} init`);
  }

  @Saga()
  tagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TagCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [TagCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [TagCreatedEvent] Saga event tagCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  tagRemoved = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TagRemovedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [TagRemovedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [TagRemovedEvent] Saga event tagRemoved:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  tagUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TagUpdatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [TagUpdatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [TagUpdatedEvent] Saga event tagUpdated:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
