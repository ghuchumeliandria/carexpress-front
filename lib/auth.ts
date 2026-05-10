import { cookies } from 'next/headers';

const COOKIE = 'cx_token';

export function getToken(): string | undefined {
  return cookies().get(COOKIE)?.value;
}

export function setTokenCookie(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearTokenCookie() {
  cookies().delete(COOKIE);
}
