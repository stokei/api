import { DomainUpdatedEvent } from '@/events/implements/domains/domain-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(DomainUpdatedEvent)
export class DomainUpdatedHandler implements IEventHandler<DomainUpdatedEvent> {
  async handle(event: DomainUpdatedEvent) {
    const { domain } = event;
    Logger.log(`#${domain.id} - updated!`, DomainUpdatedHandler.name);
    return event;
  }
}
