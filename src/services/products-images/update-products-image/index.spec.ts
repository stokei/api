import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateProductsImageService } from '.';

describe('UpdateProductsImageService', () => {
  let updateProductsImageService: UpdateProductsImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProductsImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProductsImageService = modRef.get(UpdateProductsImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProductsImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
