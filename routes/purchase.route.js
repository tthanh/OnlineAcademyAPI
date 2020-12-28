const express = require('express');
const router = express.Router();
const purchaseService = require('../services/purchase.service');
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');
const isValidDate = require('../helpers/date.helper').isValidDate;

router.get('/',checkRole.hasRole(1), async (req, res) => {
    var userId = req.query.userId;
    var courseId = req.query.courseId;
    let date = new Date(req.query.date);

    let query = {};
    if(userId){
        query.userId = userId;
    }
    if(courseId){
        query.courseId = courseId;
    }
    if(isValidDate(date)){
        query.purchaseDate = date;
    }
    let purchase= await purchaseService.getAll(query);
    res.status(200).send(purchase);
});

router.post('/', auth, checkRole.hasRole(1), async (req, res) => {
    var userId = req.body.userId;
    var courseId = req.body.userId;
    
    if(!userId || !courseId){
        res.status(400).send({});
    }

    if(await purchaseService.create({"userId" : userId, "courseId": courseId, purchaseDate : Date.now() }))
        res.status(200).send({});
    else
        res.status(500).send({});
});

module.exports = router;