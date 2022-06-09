import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';

@EventsHandler(DomainRemovedEvent)
export class DomainRemovedHandler implements IEventHandler<DomainRemovedEvent> {
  async handle(event: DomainRemovedEvent) {
    const { domain } = event;
    Logger.log(`#${domain.id} - removed!`, DomainRemovedHandler.name);
    return event;
  }
}
