import { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';

import { comparePasswords, createJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user || !user.password) {
        res.status(401);
        res.end();
        return;
      }

      const isUser = await comparePasswords(req.body.password, user.password);
      if (!isUser) {
        res.status(401);
        res.end();
        return;
      }

      const jwt = await createJWT(user);
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(200);
      res.end();
    } catch (err) {
      res.status(500);
      res.json({ error: err });
    }
  }
}
