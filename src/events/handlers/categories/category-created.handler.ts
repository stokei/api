import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CategoryCreatedEvent } from '@/events/implements/categories/category-created.event';

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedHandler
  implements IEventHandler<CategoryCreatedEvent>
{
  async handle(event: CategoryCreatedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - created!`, CategoryCreatedHandler.name);
    return event;
  }
}
