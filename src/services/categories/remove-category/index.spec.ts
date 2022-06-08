import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveCategoryService } from '.';

describe('RemoveCategoryService', () => {
  let removeCategoryService: RemoveCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeCategoryService = modRef.get(RemoveCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
