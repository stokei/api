import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateModuleService } from '.';

describe('CreateModuleService', () => {
  let createModuleService: CreateModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createModuleService = modRef.get(CreateModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
