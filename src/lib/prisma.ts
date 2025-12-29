import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query', 'error', 'warn'],
});

// Disable result caching to prevent stale data
// lazy connection is preferred
// prisma.$connect();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
