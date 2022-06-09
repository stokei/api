import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PhoneRemovedEvent } from '@/events/implements/phones/phone-removed.event';

@EventsHandler(PhoneRemovedEvent)
export class PhoneRemovedHandler implements IEventHandler<PhoneRemovedEvent> {
  async handle(event: PhoneRemovedEvent) {
    const { phone } = event;
    Logger.log(`#${phone.id} - removed!`, PhoneRemovedHandler.name);
    return event;
  }
}
