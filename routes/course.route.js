const express = require('express');
const router = express.Router();
const courseService = require('../services/course.service');
const userService = require('../services/user.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');
const feedbackRouter = require('./course/feedback.route');
const lessonRouter = require('./course/lesson.route');
const enrollmentRouter = require('./course/enrollment.route');

//comments routes
router.use('/:courseId/feedback', feedbackRouter);
router.use('/:courseId/lesson', lessonRouter);
router.use('/:courseId/enrollment', enrollmentRouter);

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
    if(req.query.keyword){
        courses = await courseService.search(req.query.keyword,offset,limit);
    }
    else{
        courses= await courseService.getAll(offset, limit);
    }
    res.status(200).send(courses);
});

router.post('/', auth, checkRole.hasRole(2), async (req, res) => {
    if(req.body.teacherId !== res.locals.userId){
        res.sendStatus(401);
    }

    if(await courseService.create(req.body)){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
    
}); 

router.put('/:courseId', auth, checkRole.hasRole(2), async (req, res) => {
    if(await courseService.update(req.params.courseId, req.body)){
        res.status(200).send({});
    }
    else{
        res.sendStatus(500);
    }
});

router.delete('/:courseId',auth, checkRole.hasRoleGreaterThan(2), async (req, res) => {
    if(await courseService.delete(req.params.courseId, res.locals.userId,res.locals.roleId)){
        res.status(200).send({});
    }
    else{
        res.status(400).send({});
    }
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