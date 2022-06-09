import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveAccessService } from '.';

describe('RemoveAccessService', () => {
  let removeAccessService: RemoveAccessService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveAccessService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeAccessService = modRef.get(RemoveAccessService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeAccessService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
