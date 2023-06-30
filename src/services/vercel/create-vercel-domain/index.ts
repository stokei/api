import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { CreateVercelDomainDTO } from '@/dtos/vercel/create-vercel-domain.dto';
import { CreateVercelDomainResponseDTO } from '@/dtos/vercel/create-vercel-domain-response.dto';
import { VERCEL_PROJECT_ID, VERCEL_TOKEN } from '@/environments';

@Injectable()
export class CreateVercelDomainService
  implements
    IBaseService<CreateVercelDomainDTO, Promise<CreateVercelDomainResponseDTO>>
{
  async execute(
    data: CreateVercelDomainDTO
  ): Promise<CreateVercelDomainResponseDTO> {
    const domain = (
      await axiosClient.post(
        `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`,
        data,
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
