import { NextFunction, Response, Request } from 'express';
import admin from 'firebase-admin';

export default async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authToken = req.headers.authtoken as string;
    await admin.auth().verifyIdToken(authToken);

    next();
  } catch (error) {
    res.status(403).json(error);
  }
}
