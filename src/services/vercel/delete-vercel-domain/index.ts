import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { axiosClient } from '@/clients/axios';
import { DeleteVercelDomainDTO } from '@/dtos/vercel/delete-vercel-domain.dto';
import { DeleteVercelDomainResponseDTO } from '@/dtos/vercel/delete-vercel-domain-response.dto';
import { VERCEL_PROJECT_ID, VERCEL_TOKEN } from '@/environments';

@Injectable()
export class DeleteVercelDomainService
  implements
    IBaseService<DeleteVercelDomainDTO, Promise<DeleteVercelDomainResponseDTO>>
{
  async execute(
    data: DeleteVercelDomainDTO
  ): Promise<DeleteVercelDomainResponseDTO> {
    const domain = (
      await axiosClient.delete(
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
