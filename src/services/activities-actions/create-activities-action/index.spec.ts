import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateActivitiesActionService } from '.';

describe('CreateActivitiesActionService', () => {
  let createActivitiesActionService: CreateActivitiesActionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateActivitiesActionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createActivitiesActionService = modRef.get(CreateActivitiesActionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createActivitiesActionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
