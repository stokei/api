import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveColorService } from '.';

describe('RemoveColorService', () => {
  let removeColorService: RemoveColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeColorService = modRef.get(RemoveColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
