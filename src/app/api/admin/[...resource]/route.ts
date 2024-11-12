import { defaultHandler } from "ra-data-simple-prisma";
import { NextResponse } from "next/server";
import { db } from '@cps/server/db';

const handler = async (req: Request, res: Response) => {
  const body = await req.json();
  const result = await defaultHandler(body, db);
  return NextResponse.json(result);
};

export { handler as GET, handler as POST };