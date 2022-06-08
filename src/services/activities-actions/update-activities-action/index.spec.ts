import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateActivitiesActionService } from '.';

describe('UpdateActivitiesActionService', () => {
  let updateActivitiesActionService: UpdateActivitiesActionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateActivitiesActionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateActivitiesActionService = modRef.get(UpdateActivitiesActionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateActivitiesActionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
