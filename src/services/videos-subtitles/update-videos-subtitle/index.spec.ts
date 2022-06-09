import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateVideosSubtitleService } from '.';

describe('UpdateVideosSubtitleService', () => {
  let updateVideosSubtitleService: UpdateVideosSubtitleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideosSubtitleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideosSubtitleService = modRef.get(UpdateVideosSubtitleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideosSubtitleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
