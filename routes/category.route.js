const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.mdw');
const checkRole = require('../middlewares/check_role.mdw');
const categoryService = require('../services/category.service');

router.get('/:categoryId',async (req, res) => {
    let category = await categoryService.getById(req.params.categoryId);
    res.status(200).send(category);
});

router.get('/', async (req, res) => {
    let category= await categoryService.getAll();
    res.status(200).send(category);
});

router.post('/', auth, checkRole.hasRole(3), async (req, res) => {
    if(await categoryService.create(req.body)){
        res.status(200).send({});
    }
    else{
        res.status(500).send({});
    }
});

router.delete('/:categoryId',auth, checkRole.hasRole(3), async (req, res) => {
    if(await categoryService.delete(req.params.categoryId)){
        res.status(200).send({});
    }
    else{
        res.status(500).send({});
    }
});

router.post('/:categoryId', auth, checkRole.hasRole(3), async (req, res) => {
    if(await categoryService.createSubcategory(req.params.categoryId, req.body)){
        res.status(200).send({});
    }
    else{
        res.status(500).send({});
    }
});

router.delete('/:categoryId/:subCategoryId', auth, checkRole.hasRole(3), async (req, res) => {
    if(await categoryService.deleteSubcategory(req.params.categoryId, req.params.subCategoryId)){
        res.status(200).send({});
    }
    else{
        res.status(500).send({});
    }
});

module.exports = router;