import { ProductsTagRemovedEvent } from '@/events/implements/products-tags/products-tag-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
