import { requireRole } from './rbac';
import { Role } from '@prisma/client';
import { TRPCError } from '@trpc/server';

describe('requireRole', () => {
  const userAdmin = { role: Role.ADMIN, id: '1', email: 'admin@example.com' };
  const userUser = { role: Role.USER, id: '2', email: 'user@example.com' };
  const userWithoutRole = { id: '3', email: 'norole@example.com' };

  it('allows access for the correct role', () => {
    expect(() => requireRole(Role.ADMIN)(userAdmin)).not.toThrow();
  });

  it('throws an error for incorrect role', () => {
    expect(() => requireRole(Role.ADMIN)(userUser)).toThrowError(TRPCError);
  });

  it('throws an error if no user is provided', () => {
    expect(() => requireRole(Role.ADMIN)(undefined as any)).toThrowError(TRPCError);
  });

  it('throws an error if user has no role', () => {
    expect(() => requireRole(Role.ADMIN)(userWithoutRole as any)).toThrowError(TRPCError);
  });

  it('includes a helpful error message', () => {
    try {
      requireRole(Role.ADMIN)(userUser);
    } catch (error) {
      expect(error).toBeInstanceOf(TRPCError);
      expect((error as TRPCError).message).toBe('Access denied. Required role: ADMIN');
    }
  });
});
