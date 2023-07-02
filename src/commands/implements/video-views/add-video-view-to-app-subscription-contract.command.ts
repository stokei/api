import { ICommand } from '@nestjs/cqrs';

import { AddVideoViewToAppSubscriptionContractDTO } from '@/dtos/video-views/add-video-view-to-app-subscription-contract.dto';

export class AddVideoViewToAppSubscriptionContractCommand
  implements ICommand, AddVideoViewToAppSubscriptionContractDTO
{
  videoView: string;
  viewedDuration: number;
  createdBy: string;

  constructor(data: AddVideoViewToAppSubscriptionContractDTO) {
    this.videoView = data.videoView;
    this.viewedDuration = data.viewedDuration;
    this.createdBy = data.createdBy;
  }
}
