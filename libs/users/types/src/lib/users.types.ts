import { User } from '@flow-recruitment/prisma';

type UserWithoutPassword = Omit<User, 'password'>;

export type { UserWithoutPassword };
