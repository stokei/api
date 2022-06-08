import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateSiteService } from '.';

describe('UpdateSiteService', () => {
  let updateSiteService: UpdateSiteService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateSiteService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateSiteService = modRef.get(UpdateSiteService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateSiteService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
