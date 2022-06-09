import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateRatingService } from '.';

describe('CreateRatingService', () => {
  let createRatingService: CreateRatingService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateRatingService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createRatingService = modRef.get(CreateRatingService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createRatingService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
