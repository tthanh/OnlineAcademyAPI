const authService = require('../services/authentication.service');
const config = require('../config.json');
const { compact } = require('underscore');

module.exports = (req, res, next) => {
    var accessToken = req.headers['authorization'];
    if (accessToken) {
        accessToken = accessToken.replace("Bearer ", "");
        if(!authService.verifyToken(accessToken))
            return res.status(401).json({
                message: 'Invalid token'
            })
        next();
    } else {
        return res.status(400).json({
            message: 'Access token not found.'
        })
    }
}