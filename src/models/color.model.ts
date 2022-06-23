import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ColorType } from '@/enums/color-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ThemeMode } from '@/enums/theme-mode.enum';
import { ColorCreatedEvent } from '@/events/implements/colors/color-created.event';
import { ColorRemovedEvent } from '@/events/implements/colors/color-removed.event';
import { ColorUpdatedEvent } from '@/events/implements/colors/color-updated.event';

export interface IColorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly themeMode: ThemeMode;
  readonly type: ColorType;
  readonly color: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class ColorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly color: string;
  readonly themeMode: ThemeMode;
  readonly type: ColorType;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IColorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COLORS,
      module: ServerStokeiApiIdPrefix.COLORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.themeMode = data.themeMode;
    this.type = data.type;
    this.color = data.color;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdColor() {
    if (this.id) {
      this.apply(
        new ColorCreatedEvent({
          color: this
        })
      );
    }
  }

  updatedColor() {
    if (this.id) {
      this.apply(
        new ColorUpdatedEvent({
          color: this
        })
      );
    }
  }

  removedColor() {
    if (this.id) {
      this.apply(
        new ColorRemovedEvent({
          color: this
        })
      );
    }
  }
}
