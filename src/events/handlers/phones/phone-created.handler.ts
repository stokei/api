import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PhoneCreatedEvent } from '@/events/implements/phones/phone-created.event';

@EventsHandler(PhoneCreatedEvent)
export class PhoneCreatedHandler implements IEventHandler<PhoneCreatedEvent> {
  async handle(event: PhoneCreatedEvent) {
    const { phone } = event;
    Logger.log(`#${phone.id} - created!`, PhoneCreatedHandler.name);
    return event;
  }
}
