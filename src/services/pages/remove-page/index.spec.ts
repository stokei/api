import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemovePageService } from '.';

describe('RemovePageService', () => {
  let removePageService: RemovePageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemovePageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removePageService = modRef.get(RemovePageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removePageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
