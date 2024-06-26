import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PluginType } from '@/enums/plugin-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export interface IPluginModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly type: PluginType;
  readonly publicKey: string;
  readonly privateKey: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PluginModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly type: PluginType;
  readonly publicKey: string;
  readonly privateKey: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IPluginModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.APPS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.type = data.type;
    this.publicKey = data.publicKey;
    this.privateKey = data.privateKey;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }
}
