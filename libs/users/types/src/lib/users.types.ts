import { User } from '@flow-recruitment/prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

export type { UserWithoutPassword };
