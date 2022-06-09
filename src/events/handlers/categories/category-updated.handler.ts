import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CategoryUpdatedEvent } from '@/events/implements/categories/category-updated.event';

@EventsHandler(CategoryUpdatedEvent)
export class CategoryUpdatedHandler
  implements IEventHandler<CategoryUpdatedEvent>
{
  async handle(event: CategoryUpdatedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - updated!`, CategoryUpdatedHandler.name);
    return event;
  }
}
