import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveProductsCategoryService } from '.';

describe('RemoveProductsCategoryService', () => {
  let removeProductsCategoryService: RemoveProductsCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveProductsCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeProductsCategoryService = modRef.get(RemoveProductsCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeProductsCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
