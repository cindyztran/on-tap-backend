import admin from '../middleware/Firebase.js'

export const isAuthenticated = async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) return next();

    const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
    if(user) {
        req.user = user
    } else {
        return res.status(401).json({error: 'token invalid'})
    }
    next();
}

export default {isAuthenticated}