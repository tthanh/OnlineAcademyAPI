const express = require('express');
const router = express.Router();
const userService = require('../services/authentication.service');

router.post('/login', (req, res) => {
    userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
});

router.post('/signup', (req, res) => {
    userService.create(req.body)
        .then(() => res.json({}))
});

router.put('/update/:userId', (req, res) => {
    userService.update(req.params.userId, req.body)
        .then(() => res.json({}));
});

module.exports = router;