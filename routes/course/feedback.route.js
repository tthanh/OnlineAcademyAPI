const express = require('express');
const router = express.Router({mergeParams: true});
const courseService = require('../../services/course.service');
const auth = require('../../middlewares/auth.mdw');
const checkRole = require('../../middlewares/check_role.mdw');

router.get('/',async (req, res) => {
    res.status(200).send("123");
});

router.post('/', auth, checkRole(2), async (req, res) => {
    res.status(200).send({});
});

router.put('/:commentId', auth, async (req, res) => {
    res.status(200).send({});
});

router.delete('/:commentId',auth, async (req, res) => {
    res.status(200).send({});
});

module.exports = router;