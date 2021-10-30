import { serialize, parse} from 'cookie';


export const MAX_AGE = 60 * 60 * 8;

export function setTokenCookie(res, token){
  const cookie = serialize('userToken', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now( + MAX_AGE * 1000)),
    httpOnly: true,
    secure: process.env.NODE_ENV=== 'production',
    path: '/',
    sameSite: 'lax'
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCokkies(req){
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCokkies(req);
  return cookies['userToken']
}

export function removeTokenCookie(res) {
  const cookie = serialize('userToken', '', {
    maxAge: -1,
    path: '/'
  })

  res.setHeader('Set-Cookie', cookie)
}