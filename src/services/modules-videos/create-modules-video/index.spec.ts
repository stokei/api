import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateModulesVideoService } from '.';

describe('CreateModulesVideoService', () => {
  let createModulesVideoService: CreateModulesVideoService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateModulesVideoService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createModulesVideoService = modRef.get(CreateModulesVideoService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createModulesVideoService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
