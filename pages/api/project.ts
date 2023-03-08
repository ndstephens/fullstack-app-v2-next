import { NextApiRequest, NextApiResponse } from 'next';

import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: needs error handling

  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME!]!);

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.status(201);
  res.end();
}
