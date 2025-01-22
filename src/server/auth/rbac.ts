import { TRPCError } from '@trpc/server';
import { Role } from '@prisma/client';

/**
 * Validates if the user's role matches the required role
 */
export function requireRole(requiredRole: Role) {
  return (userRole: Role | undefined) => {
    if (!userRole || userRole !== requiredRole) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Access denied. Required role: ${requiredRole}`,
      });
    }
  };
}
