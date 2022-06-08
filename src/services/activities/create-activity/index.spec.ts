import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateActivityService } from '.';

describe('CreateActivityService', () => {
  let createActivityService: CreateActivityService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateActivityService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createActivityService = modRef.get(CreateActivityService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createActivityService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
