import { NextFunction, Request, Response } from 'express';

const validateObject = (resourceSchema: any) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors.join(', ') });
  }
};

export default validateObject;
