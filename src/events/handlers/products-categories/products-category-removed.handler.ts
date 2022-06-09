import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsCategoryRemovedEvent } from '@/events/implements/products-categories/products-category-removed.event';

@EventsHandler(ProductsCategoryRemovedEvent)
export class ProductsCategoryRemovedHandler
  implements IEventHandler<ProductsCategoryRemovedEvent>
{
  async handle(event: ProductsCategoryRemovedEvent) {
    const { productsCategory } = event;
    Logger.log(
      `#${productsCategory.id} - removed!`,
      ProductsCategoryRemovedHandler.name
    );
    return event;
  }
}
