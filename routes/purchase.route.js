const express = require('express');
const router = express.Router();
const purchaseService = require('../services/purchase.service');
const courseService = require('../services/course.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');

router.get('/',auth, checkRole.hasRole(1), async (req, res) => {
    var userId = res.locals.userId;
    var courseId = req.query.courseId;

    let query = {};
    if(!userId)
        res.sendStatus(403);
    query.userId = userId;

    if(courseId)
        query.courseId = courseId;

    let purchase= await purchaseService.getByUser(query);
    if(purchase)
        res.status(200).send(purchase);
    else
        res.sendStatus(500);
});

router.get('/:courseId',auth, checkRole.hasRole(1), async (req, res) => {
    var userId = res.locals.userId;
    var courseId = req.query.courseId;

    let query = {};

    if(courseId){
        query.courseId = courseId;

        var course = await courseService.getById(courseId,{teacherId: userId},{"_id": 1});
        if(!course){
            return res.status.sendStatus(403);
        }
    }

    let purchase= await purchaseService.getByCourse(query);
    res.status(200).send(purchase);
});


router.post('/:courseId', auth, checkRole.hasRole(1), async (req, res) => {
    if(await purchaseService.create({"userId" : res.locals.userId, "courseId": req.params.courseId, purchaseDate : Date.now() }))
        res.status(200).send({});
    else
        res.status(500).send({});
});

module.exports = router;