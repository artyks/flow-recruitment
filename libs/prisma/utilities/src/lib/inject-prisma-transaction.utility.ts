import { Prisma, PrismaClient } from '@prisma/client';

type FunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type CallFunction<T, TKey extends keyof T> = T[TKey] extends (...args: infer Args) => infer Result
  ? (...args: Args) => Result
  : never;

const extendTransaction = (tx: Prisma.TransactionClient) => {
  return new Proxy(tx, {
    get(target, p: Extract<keyof PrismaClient, '$transaction'> | keyof Prisma.TransactionClient) {
      if (p === '$transaction') {
        return async <TRes>(fn: (tx: Prisma.TransactionClient) => Promise<TRes>): Promise<TRes> => fn(tx);
      }
      return target[p];
    },
  }) as PrismaClient;
};

const callWithInjectedPrismaTransaction = <
  TService extends { getThis: () => TService },
  TMethodKey extends FunctionKeys<TService>,
  TArgs extends Parameters<CallFunction<TService, TMethodKey>>,
  TRes extends ReturnType<CallFunction<TService, TMethodKey>>,
>(options: {
  tx: Prisma.TransactionClient;
  service: TService;
  method: TMethodKey;
  args: TArgs;
}): TRes => {
  const { service, tx, method, args } = options;
  const prisma = extendTransaction(tx);
  return (service[method] as (...args: TArgs) => TRes).call(
    Object.assign(service.getThis(), {
      prisma,
    }),
    ...args,
  );
};

interface PrismaTransactionExtandable {
  getThis(): this;
}

export { callWithInjectedPrismaTransaction, PrismaTransactionExtandable };
