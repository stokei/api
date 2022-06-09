import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveActivitiesActionService } from '.';

describe('RemoveActivitiesActionService', () => {
  let removeActivitiesActionService: RemoveActivitiesActionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveActivitiesActionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeActivitiesActionService = modRef.get(RemoveActivitiesActionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeActivitiesActionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
