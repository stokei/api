import { Test } from '@nestjs/testing';

import { FindAppCurrentPlanQueryHandler } from '.';

describe('FindAppCurrentPlanQueryHandler', () => {
  let findAppCurrentPlanQueryHandler: FindAppCurrentPlanQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [FindAppCurrentPlanQueryHandler]
    }).compile();

    findAppCurrentPlanQueryHandler = moduleRef.get(
      FindAppCurrentPlanQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAppCurrentPlanQueryHandler).toBeDefined();
  });
});
