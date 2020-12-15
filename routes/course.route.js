const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');

router.get('/:courseId', (req, res) => {
    res.status(200).send(courseService.getById(req.params.courseId));
});

router.get('/', (req, res) => {
    res.status(200).send(courseService.getAll());
});

router.post('/', (req, res) => {
    console.log(req.body);
    courseService.create(req.body);
    res.status(200).send({});
});

module.exports = router;