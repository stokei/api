import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveRatingService } from '.';

describe('RemoveRatingService', () => {
  let removeRatingService: RemoveRatingService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveRatingService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeRatingService = modRef.get(RemoveRatingService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeRatingService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
