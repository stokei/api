import { PhoneCreatedEvent } from '@/events/implements/phones/phone-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PhoneCreatedEvent)
export class PhoneCreatedHandler implements IEventHandler<PhoneCreatedEvent> {
  async handle(event: PhoneCreatedEvent) {
    const { phone } = event;
    Logger.log(`#${phone.id} - created!`, PhoneCreatedHandler.name);
    return event;
  }
}
