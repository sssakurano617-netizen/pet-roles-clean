// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"], // 安定重視
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
