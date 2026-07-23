import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
        if (err) {
            return res.status(403).send({ error: 'Unauthorized' });
        }
        
        const userpayload = payload as { userId: string; firstName: string; email: string; lastName: string };
        if (!userpayload.userId) {
            return res.status(403).send({ error: 'Token is outdated, please login again to get a new one' });
        }
        (req as any).user_Id = userpayload.userId;
        next();
    });
};

export default validateJWT;
