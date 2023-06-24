import { FormResponse, Prisma } from '@flow-recruitment/prisma';

type FindOrCreateMyFormResponseByFormIdResult = Prisma.FormResponseGetPayload<{ include: { answers: true } }>;
type FindMyUncompletedFormResponsesResult = FormResponse[];

export type { FindOrCreateMyFormResponseByFormIdResult, FindMyUncompletedFormResponsesResult };
