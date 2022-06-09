import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ColorUpdatedEvent } from '@/events/implements/colors/color-updated.event';

@EventsHandler(ColorUpdatedEvent)
export class ColorUpdatedHandler implements IEventHandler<ColorUpdatedEvent> {
  async handle(event: ColorUpdatedEvent) {
    const { color } = event;
    Logger.log(`#${color.id} - updated!`, ColorUpdatedHandler.name);
    return event;
  }
}
