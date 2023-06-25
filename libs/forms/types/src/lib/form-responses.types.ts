import { Prisma } from '@flow-recruitment/prisma/client';

type FindOrCreateMyFormResponseByFormIdResult = Prisma.FormResponseGetPayload<{ include: { answers: true } }>;
type FindMyUncompletedFormResponsesResult = Prisma.FormResponseGetPayload<{ include: { form: true } }>[];

export type { FindOrCreateMyFormResponseByFormIdResult, FindMyUncompletedFormResponsesResult };
