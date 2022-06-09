import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsTagRemovedEvent } from '@/events/implements/products-tags/products-tag-removed.event';

@EventsHandler(ProductsTagRemovedEvent)
export class ProductsTagRemovedHandler
  implements IEventHandler<ProductsTagRemovedEvent>
{
  async handle(event: ProductsTagRemovedEvent) {
    const { productsTag } = event;
    Logger.log(`#${productsTag.id} - removed!`, ProductsTagRemovedHandler.name);
    return event;
  }
}
