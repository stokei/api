import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';

@EventsHandler(DomainCreatedEvent)
export class DomainCreatedHandler implements IEventHandler<DomainCreatedEvent> {
  async handle(event: DomainCreatedEvent) {
    const { domain } = event;
    Logger.log(`#${domain.id} - created!`, DomainCreatedHandler.name);
    return event;
  }
}
