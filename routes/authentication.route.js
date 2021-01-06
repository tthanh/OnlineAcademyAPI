const express = require('express');
const router = express.Router();
const userService = require('../services/authentication.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');

router.post('/login', (req, res) => {
    userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
});

router.post('/verify', async (req, res) => {
    const otpResult = await userService.verifyOTP(req.body);

    if(otpResult){
        res.status(200).send(otpResult);
    }
    else{
        res.status(400).send("Invalid OTP");
    }
});

router.post('/signup', (req, res) => {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch((msg) => res.status(400).json(msg));
});

router.put('/update/:userId', auth, checkRole.hasRole(1), (req, res) => {
    userService.update(req.params.userId, req.body)
        .then(() => res.json({}));
});

module.exports = router;