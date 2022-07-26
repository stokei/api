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
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ColorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly color: string;
  readonly themeMode: ThemeMode;
  readonly type: ColorType;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
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
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdColor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ColorCreatedEvent({
          createdBy,
          color: this
        })
      );
    }
  }

  updatedColor({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ColorUpdatedEvent({
          updatedBy,
          color: this
        })
      );
    }
  }

  removedColor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ColorRemovedEvent({
          removedBy,
          color: this
        })
      );
    }
  }
}
