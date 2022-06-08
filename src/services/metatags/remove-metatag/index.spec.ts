import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveMetatagService } from '.';

describe('RemoveMetatagService', () => {
  let removeMetatagService: RemoveMetatagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveMetatagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeMetatagService = modRef.get(RemoveMetatagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeMetatagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
