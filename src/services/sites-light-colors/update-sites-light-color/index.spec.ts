import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UpdateSitesLightColorService } from '.';

describe('UpdateSitesLightColorService', () => {
  let updateSitesLightColorService: UpdateSitesLightColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateSitesLightColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateSitesLightColorService = modRef.get(UpdateSitesLightColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateSitesLightColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
