import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateActivityService } from '.';

describe('UpdateActivityService', () => {
  let updateActivityService: UpdateActivityService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateActivityService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateActivityService = modRef.get(UpdateActivityService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateActivityService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
