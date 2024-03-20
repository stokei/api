import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ComponentType } from '@/enums/component-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ComponentCreatedEvent } from '@/events/implements/components/component-created.event';
import { ComponentRemovedEvent } from '@/events/implements/components/component-removed.event';
import { ComponentUpdatedEvent } from '@/events/implements/components/component-updated.event';

export interface IComponentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly order: number;
  readonly type: ComponentType;
  readonly data?: any;
  readonly components?: ComponentModel[];
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ComponentModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly order: number;
  readonly type: ComponentType;
  readonly acceptTypes?: ComponentType[];
  readonly data?: any;
  readonly components?: ComponentModel[];
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IComponentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COMPONENTS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.order = data.order;
    this.type = data.type;
    this.data = data.data;
    this.components = data.components || [];
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
    this.acceptTypes = this.getAcceptTypes();
  }

  private getAcceptTypes(): ComponentType[] {
    const getAllTypes = (withoutTypes?: ComponentType[]): ComponentType[] => {
      const valuesList = Object.values(ComponentType);
      if (!withoutTypes?.length) {
        return valuesList;
      }
      return valuesList.filter((value) => !withoutTypes.includes(value));
    };
    const allTypes = getAllTypes();
    const types: Record<ComponentType, ComponentType[]> = {
      HEADER: [],
      FOOTER: [],
      IMAGE: [],
      VIDEO: [],
      GRID: [ComponentType.GRID_ITEM],
      GRID_ITEM: getAllTypes([ComponentType.GRID_ITEM]),
      SPACE: [],
      STACK: allTypes,
      TEXT: [],
      TITLE: [],
      CARD: allTypes,
      BUTTON: [],
      MENU: [ComponentType.MENU_ITEM],
      MENU_ITEM: [],
      CATALOG: [],
      NAVLINK: [ComponentType.TITLE, ComponentType.TEXT],
      NAVBAR: [
        ComponentType.IMAGE,
        ComponentType.SPACE,
        ComponentType.TEXT,
        ComponentType.TITLE,
        ComponentType.BUTTON,
        ComponentType.MENU,
        ComponentType.NAVLINK
      ],
      HERO: [ComponentType.HERO_CONTENT, ComponentType.HERO_MEDIA],
      HERO_CONTENT: allTypes,
      HERO_MEDIA: [ComponentType.VIDEO, ComponentType.IMAGE]
    };
    return types[this.type];
  }

  createdComponent({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentCreatedEvent({
          createdBy,
          component: this
        })
      );
    }
  }

  updatedComponent({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentUpdatedEvent({
          updatedBy,
          component: this
        })
      );
    }
  }

  removedComponent({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentRemovedEvent({
          removedBy,
          component: this
        })
      );
    }
  }
}
