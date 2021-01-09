const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');
const userService = require('../services/user.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');
const feedbackRouter = require('./course/feedback.route');
const lessonRouter = require('./course/lesson.route');

//comments routes
router.use('/:courseId/feedback', feedbackRouter);
router.use('/:courseId/lesson', lessonRouter);

router.get('/:courseId',async (req, res) => {
    let course = await courseService.getById(req.params.courseId);
    res.status(200).send(course);
});

router.get('/', async (req, res) => {
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);

    let courses ={}

    if(isNaN(offset) ||offset < 0){
        offset = 0;
    }

    if(isNaN(limit) || limit < 0){
        limit = 20;
    }
    console.log(limit);
    if(req.query.keyword){
        courses = await courseService.search(req.query.keyword,offset,limit);
    }
    else{
        courses= await courseService.getAll(undefined,undefined, offset, limit);
    }

    courses = courses
        .map(c =>{
            return _.omit(c,'feedback','lessons','lastEdited','samplePictures','teacherId')
        });

    res.status(200).send(courses);
});

router.post('/', auth, checkRole.hasRole(2), async (req, res) => {
    if(await courseService.create(req.body)){
        res.status(200).send({});
    }
    else{
        res.status(500).send({});
    }
    
}); 

router.put('/:courseId', auth, checkRole.hasRole(2), async (req, res) => {
    courseService.update(req.params.courseId,undefined, req.body);
    res.status(200).send({});
});

router.delete('/:courseId',auth, checkRole.hasRole(2), async (req, res) => {
    courseService.delete(courseId);
    res.status(200).send({});
});

router.post('/:courseId/enroll/:userId', auth, checkRole.hasRole(1), async (req, res) => {
    courseService.enrollCourse(req.params.courseId,req.params.userId);
    res.status(200).send({});
});

router.delete('/:courseId/enroll/:userId',auth, checkRole.hasRole(1), async (req, res) => {
    courseService.unenrollCourse(req.params.courseId,req.params.userId);
    res.status(200).send({});
});



module.exports = router;