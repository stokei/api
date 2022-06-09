import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveProductService } from '.';

describe('RemoveProductService', () => {
  let removeProductService: RemoveProductService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProductService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProductService = modRef.get(RemoveProductService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProductService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
