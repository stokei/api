import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductRemovedEvent } from '@/events/implements/products/product-removed.event';

@EventsHandler(ProductRemovedEvent)
export class ProductRemovedHandler
  implements IEventHandler<ProductRemovedEvent>
{
  async handle(event: ProductRemovedEvent) {
    const { product } = event;
    Logger.log(`#${product.id} - removed!`, ProductRemovedHandler.name);
    return event;
  }
}
