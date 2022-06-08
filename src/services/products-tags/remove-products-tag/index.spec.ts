import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveProductsTagService } from '.';

describe('RemoveProductsTagService', () => {
  let removeProductsTagService: RemoveProductsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProductsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProductsTagService = modRef.get(RemoveProductsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProductsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
