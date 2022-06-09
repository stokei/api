import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateProductsImageService } from '.';

describe('CreateProductsImageService', () => {
  let createProductsImageService: CreateProductsImageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProductsImageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProductsImageService = modRef.get(CreateProductsImageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProductsImageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
