import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateProductService } from '.';

describe('CreateProductService', () => {
  let createProductService: CreateProductService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProductService = modRef.get(CreateProductService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProductService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
