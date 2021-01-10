const express = require('express');
const router = express.Router({mergeParams: true});
const feedbackService = require('../../services/course/feedback.service');
const auth = require('../../middlewares/auth.mdw');
const checkRole = require('../../middlewares/check_role.mdw');

router.get('/',async (req, res) => {
    const feedback = await feedbackService.getAll(req.params.courseId);
    res.send(feedback);
});

router.get('/:feedbackId', async (req, res) => {
    const feedback = await feedbackService.getById(req.params.courseId,req.params.feedbackId);
    res.send(feedback);
});

router.post('/', auth, checkRole.hasRoleGreaterThan(1), async (req, res) => {
    await feedbackService.create(req.params.courseId,{...req.body, userId : res.locals.userId});
    res.status(200).send({});
});

router.put('/:feedbackId', auth, async (req, res) => {
    await feedbackService.update(req.params.courseId,req.params.feedbackId,req.body);
    res.status(200).send({});
});

router.delete('/:feedbackId',auth, async (req, res) => {
    await feedbackService.delete(req.params.courseId,req.params.feedbackId);
    res.status(200).send({});
});

module.exports = router;