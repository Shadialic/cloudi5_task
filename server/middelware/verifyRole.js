
const verifyRole = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role'];
        if (!userRole) {
            return res.status(403).json({ message: 'No role provided' });
        }
        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.role = userRole; 
        next();
    };
};

export default verifyRole;
