import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateProductsTagService } from '.';

describe('UpdateProductsTagService', () => {
  let updateProductsTagService: UpdateProductsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProductsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProductsTagService = modRef.get(UpdateProductsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProductsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
