import { requireRole } from './rbac';
import { Role } from '@prisma/client';
import { TRPCError } from '@trpc/server';

describe('requireRole', () => {
  it('allows access for the correct role', () => {
    expect(() => requireRole(Role.ADMIN)(Role.ADMIN)).not.toThrow();
  });

  it('throws an error for incorrect role', () => {
    expect(() => requireRole(Role.ADMIN)(Role.USER)).toThrowError(TRPCError);
  });

  it('throws an error if no role is provided', () => {
    expect(() => requireRole(Role.ADMIN)(undefined)).toThrowError(TRPCError);
  });

  it('allows access for matching roles with a higher privilege', () => {
    expect(() => requireRole(Role.ADMIN)(Role.ADMIN)).not.toThrow(); 
  });

  it('throws an error for roles with lower privileges', () => {
    expect(() => requireRole(Role.ADMIN)(Role.USER)).toThrowError(TRPCError); 
  });
    });
