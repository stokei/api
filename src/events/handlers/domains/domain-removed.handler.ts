import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(DomainRemovedEvent)
export class DomainRemovedHandler implements IEventHandler<DomainRemovedEvent> {
  async handle(event: DomainRemovedEvent) {
    const { domain } = event;
    Logger.log(`#${domain.id} - removed!`, DomainRemovedHandler.name);
    return event;
  }
}
