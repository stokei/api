import { ProductRemovedEvent } from '@/events/implements/products/product-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
