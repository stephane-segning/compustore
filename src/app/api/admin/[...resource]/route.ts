import { db } from '@cps/server/db';
import { NextResponse } from 'next/server';
import { defaultHandler } from 'ra-data-simple-prisma';

const handler = async (req: Request, res: Response) => {
  const body = await req.json();
  const include = body?.params?.meta?.include ?? {};

  const result = await defaultHandler(body, db, {
    getOne: {
      include: include.getOne,
    },
    getList: {
      include: include.getList,
    },
    getMany: {
      include: include.getMany,
    },
    create: {
      include: include.create,
    },
    getManyReference: {
      include: include.getManyReference,
    },
  });
  return NextResponse.json(result);
};

export { handler as GET, handler as POST };
