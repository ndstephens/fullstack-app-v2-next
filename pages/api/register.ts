import { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';

import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: could check req.body values first

  if (req.method === 'POST') {
    try {
      const user = await db.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      });

      const jwt = await createJWT(user);

      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      );

      res.status(201);
      res.end();
    } catch (err) {
      res.status(500);
      res.json({ error: err });
    }
  }
}
