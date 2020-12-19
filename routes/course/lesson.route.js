const express = require('express');
const router = express.Router({mergeParams: true});
const lessonService = require('../../services/course/lesson.service');
const auth = require('../../middlewares/auth.mdw');
const checkRole = require('../../middlewares/check_role.mdw');

router.get('/',async (req, res) => {
    console.log(req.params);
    const lessons = await lessonService.getAll(req.params.courseId);
    res.send(lessons);
});

router.get('/:lessonId', async (req, res) => {
    console.log(req.params.courseId);
    const lessons = await lessonService.getById(req.params.courseId,req.params.lessonId);
    res.send(lessons);
});

router.post('/', auth, checkRole(2), async (req, res) => {
    res.status(200).send({});
});

router.put('/:lessonId', auth, checkRole(2), async (req, res) => {
    courseService.update(courseId, req.body);
    res.status(200).send({});
});

router.delete('/:lessonId',auth, checkRole(2), async (req, res) => {
    courseService.delete(courseId);
    res.status(200).send({});
});

module.exports = router;