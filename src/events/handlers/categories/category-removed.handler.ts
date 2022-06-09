import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CategoryRemovedEvent } from '@/events/implements/categories/category-removed.event';

@EventsHandler(CategoryRemovedEvent)
export class CategoryRemovedHandler
  implements IEventHandler<CategoryRemovedEvent>
{
  async handle(event: CategoryRemovedEvent) {
    const { category } = event;
    Logger.log(`#${category.id} - removed!`, CategoryRemovedHandler.name);
    return event;
  }
}
