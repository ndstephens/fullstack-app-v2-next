import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

import bcrypt from 'bcrypt';
import { jwtVerify, SignJWT } from 'jose';

import { db } from './db';

//* =============================================
//*                HASH PASSWORD                =
//*==============================================
export const hashPassword = (password: string) => bcrypt.hash(password, 10);

//* =============================================
//*             COMPARE PASSWORD                =
//*==============================================
export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

//

//* =============================================
//*                   JWT's                     =
//*==============================================
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
type JWTPayload = { id: string; email: string };

//* =============================================
//*                 CREATE JWT                  =
//*==============================================
export const createJWT = (user: JWTPayload) => {
  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('168h') // 1 week
    .sign(secret);
};

//* =============================================
//*               VALIDATE JWT                  =
//*==============================================
export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(jwt, secret);
  return payload.payload as JWTPayload;
};

//* =============================================
//*          GET USER FROM JWT/COOKIE           =
//*==============================================
export const getUserFromCookie = async (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  const jwt = cookies.get(process.env.COOKIE_NAME!);
  if (!jwt) {
    return undefined;
  }
  const { id } = await validateJWT(jwt.value);
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
