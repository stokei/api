import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveVideosTagService } from '.';

describe('RemoveVideosTagService', () => {
  let removeVideosTagService: RemoveVideosTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveVideosTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeVideosTagService = modRef.get(RemoveVideosTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeVideosTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
