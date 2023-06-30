import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CheckVercelDomainDTO } from '@/dtos/vercel/check-vercel-domain.dto';
import { CheckVercelDomainResponseDTO } from '@/dtos/vercel/check-vercel-domain-response.dto';
import { VERCEL_PROJECT_ID, VERCEL_TOKEN } from '@/environments';

@Injectable()
export class CheckVercelDomainService
  implements
    IBaseService<CheckVercelDomainDTO, Promise<CheckVercelDomainResponseDTO>>
{
  async execute(
    data: CheckVercelDomainDTO
  ): Promise<CheckVercelDomainResponseDTO> {
    const domain = (
      await axiosClient.get(
        `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${data.name}`,
        {
          headers: {
            Authorization: `Bearer ${VERCEL_TOKEN}`
          }
        }
      )
    ).data;
    return domain;
  }
}
