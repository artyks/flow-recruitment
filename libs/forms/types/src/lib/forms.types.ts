import { Prisma } from '@flow-recruitment/prisma/client';

type FindOneFormResult = Prisma.FormGetPayload<{ include: { questions: { include: { visibilityRules: true } } } }>;

export type { FindOneFormResult };
