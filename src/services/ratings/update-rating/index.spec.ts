import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateRatingService } from '.';

describe('UpdateRatingService', () => {
  let updateRatingService: UpdateRatingService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateRatingService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateRatingService = modRef.get(UpdateRatingService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateRatingService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
