import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateModulesMaterialService } from '.';

describe('CreateModulesMaterialService', () => {
  let createModulesMaterialService: CreateModulesMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateModulesMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createModulesMaterialService = modRef.get(CreateModulesMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createModulesMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
