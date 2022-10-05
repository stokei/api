import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import { URL } from 'url';

import { qencodeApiClient } from '@/clients/qencode';
import {
  QencodeCreateVideoEncodingDTO,
  QencodeCreateVideoEncodingResponse
} from '@/dtos/qencode/qencode-create-video-encoding.dto';
import {
  DIGITALOCEAN_SPACES_ENDPOINT,
  DIGITALOCEAN_SPACES_KEY,
  DIGITALOCEAN_SPACES_NAME,
  DIGITALOCEAN_SPACES_SECRET,
  QENCODE_WEBHOOK_ENDPOINT
} from '@/environments';
import { VideoNotFoundException } from '@/errors';

@Injectable()
export class QencodeCreateVideoEncodingService
  implements
    IBaseService<
      QencodeCreateVideoEncodingDTO,
      Promise<QencodeCreateVideoEncodingResponse>
    >
{
  async execute(
    data: QencodeCreateVideoEncodingDTO
  ): Promise<QencodeCreateVideoEncodingResponse> {
    if (!data?.video) {
      throw new VideoNotFoundException();
    }

    const task = await qencodeApiClient.CreateTask();

    const webhookURL = new URL(QENCODE_WEBHOOK_ENDPOINT);
    webhookURL.searchParams.set('video', data.video.id);

    const audioBitrate = 128;
    const optimizeBitrate = 1;
    const taskTranscodingQueryParams = {
      format: [
        {
          output: 'advanced_hls',
          separate_audio: 1,
          segment_duration: '8',
          destination: {
            url: `s3://${DIGITALOCEAN_SPACES_ENDPOINT}/${DIGITALOCEAN_SPACES_NAME}/${data.video.filename}`,
            key: DIGITALOCEAN_SPACES_KEY,
            secret: DIGITALOCEAN_SPACES_SECRET,
            permissions: 'public-read'
          },
          stream: [
            {
              video_codec: 'libx264',
              height: 720,
              audio_bitrate: audioBitrate,
              optimize_bitrate: optimizeBitrate,
              hdr_to_sdr: 0
            },
            {
              video_codec: 'libx264',
              height: 480,
              audio_bitrate: audioBitrate,
              optimize_bitrate: optimizeBitrate
            },
            {
              video_codec: 'libx264',
              height: 360,
              audio_bitrate: audioBitrate,
              optimize_bitrate: optimizeBitrate
            },
            {
              video_codec: 'libx264',
              height: 240,
              audio_bitrate: audioBitrate,
              optimize_bitrate: optimizeBitrate
            }
          ],
          playlist_name: `${data.video.filename}.m3u8`
        }
      ],
      encoder_version: '2',
      callback_url: webhookURL.toString(),
      source: data.video.url
    };

    await task.StartCustom(taskTranscodingQueryParams, null);

    return {
      id: task.taskToken
    };
  }
}
