const express = require('express');
const router = express.Router({mergeParams: true});
const enrollmentService = require('../../services/course/enrollment.service');
const auth = require('../../middlewares/auth.mdw');
const checkRole = require('../../middlewares/check_role.mdw');

router.get('/',async (req, res) => {
    const enrollment = await enrollmentService.getAll(req.params.courseId);
    res.send(enrollment);
});

router.get('/:enrollmentId', async (req, res) => {
    const enrollment = await enrollmentService.getById(req.params.courseId,req.params.enrollmentId);
    res.send(enrollment);
});

router.post('/', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    await enrollmentService.create(req.params.courseId,{...req.body, userId : res.locals.userId});
    res.status(200).send({});
});

router.delete('/:enrollmentId',auth, async (req, res) => {
    await enrollmentService.delete(req.params.courseId,req.params.enrollmentId);
    res.status(200).send({});
});

module.exports = router;