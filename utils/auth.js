import Iron from '@hapi/iron';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(res, session){
  const createdAt = Date.now()

  const obj = { ...session, createdAt, maxAge: MAX_AGE}
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}


export async function getLoginSession(req){
  const token = getTokenCookie(req);
  if(!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000


  if(Date.now() > expiresAt){
    throw new Error('Session expired')
  }

  return session
}