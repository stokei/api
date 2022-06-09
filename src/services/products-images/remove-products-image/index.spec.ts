import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { RemoveProductsImageService } from '.';

describe('RemoveProductsImageService', () => {
  let removeProductsImageService: RemoveProductsImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProductsImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProductsImageService = modRef.get(RemoveProductsImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProductsImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
