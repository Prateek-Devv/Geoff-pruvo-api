import { Request, Response, NextFunction } from 'express';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const apiKey = req.headers['x-api-key'];
//   if (!apiKey || apiKey !== 'your_pruvo_api_key') {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   next();
// };

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Temporary bypass for testing
  next();
};
