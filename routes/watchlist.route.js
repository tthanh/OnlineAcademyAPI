const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');

router.get('/', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    res.status(200).send(await userService.getWatchList({_id : res.locals.userId}));
});

router.post('/:courseId', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    if(await userService.addToWatchList({_id: res.locals.userId, courseId : req.params.courseId})){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});

router.delete('/:courseId', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    if(await userService.removeFromWatchList({_id: res.locals.userId, courseId : req.params.courseId})){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});

module.exports = router;