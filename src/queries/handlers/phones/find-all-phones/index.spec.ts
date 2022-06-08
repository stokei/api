import { CountPhonesRepository } from '@/repositories/phones/count-phones';
import { FindAllPhonesRepository } from '@/repositories/phones/find-all-phones';
import { Test } from '@nestjs/testing';
import { FindAllPhonesQueryHandler } from '.';

describe('FindAllPhonesQueryHandler', () => {
  let findAllPhonesRepository: FindAllPhonesRepository;
  let findAllPhonesQueryHandler: FindAllPhonesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPhonesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPhonesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPhonesQueryHandler
      ]
    }).compile();

    findAllPhonesRepository = moduleRef.get(FindAllPhonesRepository);
    findAllPhonesQueryHandler = moduleRef.get(FindAllPhonesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPhonesQueryHandler).toBeDefined();
    expect(findAllPhonesRepository).toBeDefined();
  });
});
