import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PhoneUpdatedEvent } from '@/events/implements/phones/phone-updated.event';

@EventsHandler(PhoneUpdatedEvent)
export class PhoneUpdatedHandler implements IEventHandler<PhoneUpdatedEvent> {
  async handle(event: PhoneUpdatedEvent) {
    const { phone } = event;
    Logger.log(`#${phone.id} - updated!`, PhoneUpdatedHandler.name);
    return event;
  }
}
