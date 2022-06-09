import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ColorRemovedEvent } from '@/events/implements/colors/color-removed.event';

@EventsHandler(ColorRemovedEvent)
export class ColorRemovedHandler implements IEventHandler<ColorRemovedEvent> {
  async handle(event: ColorRemovedEvent) {
    const { color } = event;
    Logger.log(`#${color.id} - removed!`, ColorRemovedHandler.name);
    return event;
  }
}
