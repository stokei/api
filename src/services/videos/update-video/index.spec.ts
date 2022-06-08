import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateVideoService } from '.';

describe('UpdateVideoService', () => {
  let updateVideoService: UpdateVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateVideoService = modRef.get(UpdateVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
