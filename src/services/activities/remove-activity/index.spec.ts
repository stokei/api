import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveActivityService } from '.';

describe('RemoveActivityService', () => {
  let removeActivityService: RemoveActivityService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveActivityService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeActivityService = modRef.get(RemoveActivityService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeActivityService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
