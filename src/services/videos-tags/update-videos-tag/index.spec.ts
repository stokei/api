import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateVideosTagService } from '.';

describe('UpdateVideosTagService', () => {
  let updateVideosTagService: UpdateVideosTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideosTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideosTagService = modRef.get(UpdateVideosTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideosTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
