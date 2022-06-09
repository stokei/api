import { Test } from '@nestjs/testing';

import { CountColorsRepository } from '@/repositories/colors/count-colors';
import { FindAllColorsRepository } from '@/repositories/colors/find-all-colors';

import { FindAllColorsQueryHandler } from '.';

describe('FindAllColorsQueryHandler', () => {
  let findAllColorsRepository: FindAllColorsRepository;
  let findAllColorsQueryHandler: FindAllColorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountColorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllColorsQueryHandler
      ]
    }).compile();

    findAllColorsRepository = moduleRef.get(FindAllColorsRepository);
    findAllColorsQueryHandler = moduleRef.get(FindAllColorsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllColorsQueryHandler).toBeDefined();
    expect(findAllColorsRepository).toBeDefined();
  });
});
