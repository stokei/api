import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateVideosSubtitleService } from '.';

describe('CreateVideosSubtitleService', () => {
  let createVideosSubtitleService: CreateVideosSubtitleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVideosSubtitleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVideosSubtitleService = modRef.get(CreateVideosSubtitleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVideosSubtitleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
