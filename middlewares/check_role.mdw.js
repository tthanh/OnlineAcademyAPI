const { decode } = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports.hasRole = (roleId) => (req, res, next) => {
    var accessToken = req.headers['authorization'];
    if (!accessToken)
        res.status(403);
    
    accessToken = accessToken.replace("Bearer ", "");
    decoded = jwtDecode(accessToken);
    if(!decoded)
        res.status(403);
        
    if(roleId != decoded.roleId)
        res.status(403);
    console.log(decoded);
    res.locals.userId = decoded.userId;
    res.locals.roleId = decoded.roleId; 
    next();
}

module.exports.hasRoleGreaterThan = (roleId) => (req, res, next) => {
    var accessToken = req.headers['authorization'];
    if (!accessToken)
        res.status(403);
    
    accessToken = accessToken.replace("Bearer ", "");
    decoded = jwtDecode(accessToken);
    if(!decoded)
        res.status(403);
        
    if(decoded.roleId >= roleId)
        res.status(403);
    res.locals.userId = decoded.userId;
    res.locals.roleId = decoded.roleId; 
    next();
}