import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RemoveSiteService } from '.';

describe('RemoveSiteService', () => {
  let removeSiteService: RemoveSiteService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        RemoveSiteService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    removeSiteService = modRef.get(RemoveSiteService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(removeSiteService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
