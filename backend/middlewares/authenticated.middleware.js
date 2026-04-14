
import jwt from 'jsonwebtoken';
export default async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message: 'you are not authenticated'});
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: 'you are not authenticated'});
    try {
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        next(err);
    }
}