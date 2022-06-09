import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProductsImageRemovedEvent } from '@/events/implements/products-images/products-image-removed.event';

@EventsHandler(ProductsImageRemovedEvent)
export class ProductsImageRemovedHandler
  implements IEventHandler<ProductsImageRemovedEvent>
{
  async handle(event: ProductsImageRemovedEvent) {
    const { productsImage } = event;
    Logger.log(
      `#${productsImage.id} - removed!`,
      ProductsImageRemovedHandler.name
    );
    return event;
  }
}
