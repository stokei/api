import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsTagUpdatedEvent } from '@/events/implements/products-tags/products-tag-updated.event';

@EventsHandler(ProductsTagUpdatedEvent)
export class ProductsTagUpdatedHandler
  implements IEventHandler<ProductsTagUpdatedEvent>
{
  async handle(event: ProductsTagUpdatedEvent) {
    const { productsTag } = event;
    Logger.log(`#${productsTag.id} - updated!`, ProductsTagUpdatedHandler.name);
    return event;
  }
}
