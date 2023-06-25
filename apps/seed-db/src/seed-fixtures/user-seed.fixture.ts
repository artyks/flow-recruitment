import { Prisma } from '.prisma/client';

const SEED_USER_ID = 'cbb73808-e05a-4d4b-a329-5d3767323607';
const SEED_USER_EMAIL = 'seed.email@email.com';

const userFixture: Prisma.UserCreateInput = {
  id: SEED_USER_ID,
  email: SEED_USER_EMAIL,
  password: '1234',
};

export { userFixture, SEED_USER_ID, SEED_USER_EMAIL };
