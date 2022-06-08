import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveModuleService } from '.';

describe('RemoveModuleService', () => {
  let removeModuleService: RemoveModuleService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveModuleService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeModuleService = modRef.get(RemoveModuleService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeModuleService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
