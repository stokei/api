import { ColorCreatedEvent } from '@/events/implements/colors/color-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ColorCreatedEvent)
export class ColorCreatedHandler implements IEventHandler<ColorCreatedEvent> {
  async handle(event: ColorCreatedEvent) {
    const { color } = event;
    Logger.log(`#${color.id} - created!`, ColorCreatedHandler.name);
    return event;
  }
}
