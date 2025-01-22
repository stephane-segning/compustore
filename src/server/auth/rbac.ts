import { TRPCError } from '@trpc/server';
import { Role } from '@prisma/client';

/**
 * Validates if the user's role matches the required role
 * Takes a full user for future extensibility
 */
export function requireRole(requiredRole: Role) {
    return (user: { role: Role; id?: string; email?: string | null; permissions?: string[] }) => {
      if (!user) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `Access denied. No user provided.`,
        });
      }
  
      if (user.role !== requiredRole) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `Access denied. Required role: ${requiredRole}`,
        });
      }
    };
  }
