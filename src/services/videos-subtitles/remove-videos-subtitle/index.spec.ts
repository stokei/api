import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveVideosSubtitleService } from '.';

describe('RemoveVideosSubtitleService', () => {
  let removeVideosSubtitleService: RemoveVideosSubtitleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideosSubtitleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideosSubtitleService = modRef.get(RemoveVideosSubtitleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideosSubtitleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
