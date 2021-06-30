import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string,
  iat: number,
  exp: number
}

export default function authMiddleware( request : Request, response : Response, next : NextFunction )
{
  const { authorization } = request.headers;

  if( !authorization ) {
    return response.status(401).json({message:'Token não encontrado'});
  }

  const token = authorization.replace('Bearer','').trim();

  try {
    const data = jwt.verify(token,'osegredo');
    const { id } = data as TokenPayload;
    request.userId = id;
    return next();
  } catch {
    return response.status(401)
      .json({message:'Token expirado ou inválido'});
  }

}
