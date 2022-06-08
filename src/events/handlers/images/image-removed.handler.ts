import { ImageRemovedEvent } from '@/events/implements/images/image-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ImageRemovedEvent)
export class ImageRemovedHandler implements IEventHandler<ImageRemovedEvent> {
  async handle(event: ImageRemovedEvent) {
    const { image } = event;
    Logger.log(`#${image.id} - removed!`, ImageRemovedHandler.name);
    return event;
  }
}
