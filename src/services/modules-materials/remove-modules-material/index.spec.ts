import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveModulesMaterialService } from '.';

describe('RemoveModulesMaterialService', () => {
  let removeModulesMaterialService: RemoveModulesMaterialService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveModulesMaterialService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeModulesMaterialService = modRef.get(RemoveModulesMaterialService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeModulesMaterialService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
