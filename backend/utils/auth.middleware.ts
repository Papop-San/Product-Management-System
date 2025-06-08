import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from './jwt';  

const jwtUtil = new JwtUtil();

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token is missing' });
    return;  
  }

  try {
    const user = jwtUtil.verifyAccessToken(token);
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
