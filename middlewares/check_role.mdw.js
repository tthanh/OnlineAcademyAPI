const { decode } = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports.hasRole = (role) => (req, res, next) => {
    var accessToken = req.headers['authorization'];
    if (!accessToken)
        res.status(403);
    
    accessToken = accessToken.replace("Bearer ", "");
    decoded = jwtDecode(accessToken);
    if(!decoded)
        res.status(403);
        
    if(role != decoded.role)
        res.status(403);
                
    next();
}

module.exports.hasRoleGreaterThan = (role) => (req, res, next) => {
    var accessToken = req.headers['authorization'];
    if (!accessToken)
        res.status(403);
    
    accessToken = accessToken.replace("Bearer ", "");
    decoded = jwtDecode(accessToken);
    if(!decoded)
        res.status(403);
        
    if(decoded.role >= role)
        res.status(403);
                
    next();
}