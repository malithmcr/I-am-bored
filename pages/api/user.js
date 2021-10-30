
import {getLoginSession} from '../../utils/auth';

export default async function user(req, res) {
  // get the cookie
  const session = await getLoginSession(req);
  
  res.status(200).json({user: session || null})
}