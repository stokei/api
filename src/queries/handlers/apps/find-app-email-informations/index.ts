import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { stokeiDefaultColors } from '@/constants/stokei-default-colors';
import {
  FindAppEmailInformationsColors,
  FindAppEmailInformationsResponse
} from '@/dtos/apps/find-app-email-informations.dto';
import { ColorType } from '@/enums/color-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppEmailInformationsQuery } from '@/queries/implements/apps/find-app-email-informations.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { FindAllColorsService } from '@/services/colors/find-all-colors';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { FindImageByIdService } from '@/services/images/find-image-by-id';
import { getDefaultAppDomain } from '@/utils/get-default-app-domain';

@QueryHandler(FindAppEmailInformationsQuery)
export class FindAppEmailInformationsQueryHandler
  implements IQueryHandler<FindAppEmailInformationsQuery>
{
  constructor(
    private readonly findAllColorsService: FindAllColorsService,
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findImageByIdService: FindImageByIdService,
    private readonly findFileByIdService: FindFileByIdService
  ) {}

  async execute(
    query: FindAppEmailInformationsQuery
  ): Promise<FindAppEmailInformationsResponse> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.app);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }

    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const baseAppURL = await this.getDomain({ appId: app.id });
    const logoURL = await this.getLogoURL({ appLogoId: app.logo });
    const colors = await this.getColors({ appId: app.id });

    return {
      app,
      baseAppURL,
      logoURL,
      colors
    };
  }

  private async getDomain({ appId }: { appId: string }): Promise<string> {
    try {
      const appDomain = await this.findAppCurrentDomainService.execute(appId);
      return `https://${appDomain.name}`;
    } catch (error) {}
    return getDefaultAppDomain({ appId });
  }

  private async getLogoURL({
    appLogoId
  }: {
    appLogoId: string;
  }): Promise<string> {
    try {
      const image = await this.findImageByIdService.execute(appLogoId);
      const file =
        image?.id && (await this.findFileByIdService.execute(image?.id));
      return file?.url;
    } catch (error) {}
    return;
  }

  private async getColors({
    appId
  }: {
    appId: string;
  }): Promise<FindAppEmailInformationsColors> {
    let appColors: FindAppEmailInformationsColors = {};
    try {
      const colors = await this.findAllColorsService.execute({
        page: {
          limit: 1
        },
        where: {
          AND: {
            parent: {
              equals: appId
            },
            type: ColorType.PRIMARY
          }
        }
      });
      if (colors?.totalCount > 0) {
        appColors = colors?.items?.reduce(
          (prevColors, color) => ({
            ...prevColors,
            [color.type]: color.color
          }),
          {}
        );
      }
    } catch (e) {}
    return { ...stokeiDefaultColors, ...appColors };
  }
}