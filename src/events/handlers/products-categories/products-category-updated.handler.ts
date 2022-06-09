import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsCategoryUpdatedEvent } from '@/events/implements/products-categories/products-category-updated.event';

@EventsHandler(ProductsCategoryUpdatedEvent)
export class ProductsCategoryUpdatedHandler
  implements IEventHandler<ProductsCategoryUpdatedEvent>
{
  async handle(event: ProductsCategoryUpdatedEvent) {
    const { productsCategory } = event;
    Logger.log(
      `#${productsCategory.id} - updated!`,
      ProductsCategoryUpdatedHandler.name
    );
    return event;
  }
}
