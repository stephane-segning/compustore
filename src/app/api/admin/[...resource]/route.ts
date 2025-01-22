import { defaultHandler } from "ra-data-simple-prisma";
import { NextResponse } from "next/server";
import { db } from '@cps/server/db';
import { auth } from "@cps/server/auth";
import { requireRole } from "@cps/server/auth/rbac";
import { Role } from "@prisma/client";

const handler = async (req: Request, res: Response) => {
  const session = await auth(); 
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  requireRole(Role.ADMIN)(session.user.role);
  const body = await req.json();
  const result = await defaultHandler(body, db);
  return NextResponse.json(result);
};

export { handler as GET, handler as POST };