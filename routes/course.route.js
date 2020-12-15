const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');

router.get('/:courseId',async (req, res) => {
    let course = await courseService.getById(req.params.courseId);
    res.status(200).send(course);
});

router.get('/', async (req, res) => {
    let courses= await courseService.getAll();
    res.status(200).send(courses);
});

router.post('/', async (req, res) => {
    courseService.create(req.body);
    res.status(200).send({});
});

router.put('/:courseId', async (req, res) => {
    courseService.update(courseId, req.body);
    res.status(200).send({});
});

router.delete('/:courseId', async (req, res) => {
    courseService.delete(courseId);
    res.status(200).send({});
});

module.exports = router;