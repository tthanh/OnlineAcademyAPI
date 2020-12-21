const express = require('express');
const router = express.Router({mergeParams: true});
const lessonService = require('../../services/course/lesson.service');
const auth = require('../../middlewares/auth.mdw');
const checkRole = require('../../middlewares/check_role.mdw');

router.get('/',async (req, res) => {
    const lessons = await lessonService.getAll(req.params.courseId);
    res.send(lessons);
});

router.get('/:lessonId', async (req, res) => {
    const lesson = await lessonService.getById(req.params.courseId,req.params.lessonId);
    console.log(lesson);
    res.send(lesson);
});

router.post('/', auth, checkRole.hasRole(2), async (req, res) => {
    await lessonService.create(req.params.courseId,req.body);
    res.status(200).send({});
});

router.put('/:lessonId', auth, checkRole.hasRole(2), async (req, res) => {
    await lessonService.update(req.params.courseId,req.params.lessonId,req.body);
    res.status(200).send({});
});

router.delete('/:lessonId',auth, checkRole.hasRole(2), async (req, res) => {
    await lessonService.delete(req.params.courseId,req.params.lessonId);
    res.status(200).send({});
});

module.exports = router;