import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { DomainUpdatedEvent } from '@/events/implements/domains/domain-updated.event';

@EventsHandler(DomainUpdatedEvent)
export class DomainUpdatedHandler implements IEventHandler<DomainUpdatedEvent> {
  async handle(event: DomainUpdatedEvent) {
    const { domain } = event;
    Logger.log(`#${domain.id} - updated!`, DomainUpdatedHandler.name);
    return event;
  }
}
