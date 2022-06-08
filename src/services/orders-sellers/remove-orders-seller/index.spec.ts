import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveOrdersSellerService } from '.';

describe('RemoveOrdersSellerService', () => {
  let removeOrdersSellerService: RemoveOrdersSellerService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveOrdersSellerService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeOrdersSellerService = modRef.get(RemoveOrdersSellerService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeOrdersSellerService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
