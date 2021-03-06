const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');

router.put('/', auth, checkRole.hasRoleGreaterThan(1), (req, res) => {
    userService.update(res.locals.userId, req.body)
        .then(() => res.status(200).json({}));
});

router.get('/', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    res.status(200).send(await userService.getById({_id :res.locals.userId}));
});

router.get('/all', auth, checkRole.hasRole(3), async (req, res) => {
    res.status(200).send(await userService.getAll());
});

router.get('/:userId', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    res.status(200).send(await userService.getById({_id :req.params.userId}));
});

router.delete('/:userId', auth, checkRole.hasRole(3), async (req, res) => {
    res.status(200).send(await userService.delete(req.params.userId));
});

module.exports = router;