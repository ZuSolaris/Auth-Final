'use strict';

const express = require('express');
const shoesModel = require('./models');
const bearerAuth = require ('./auth/middleware/bearer');
const permissions = require('./auth/middleware/acl');

const router = express.Router();

router.get('/shoes', bearerAuth, permissions('read'), handleGetAll);
router.get('/shoes/:id', bearerAuth, permissions('read'), handleGetOne);
router.post('/shoes', bearerAuth, permissions('create'), handleCreate);
router.put('/shoes/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/shoes/:id', bearerAuth, permissions('update'), handleDelete);

async function handleGetAll(req, res, next) {
  try {
    let allRecords = await shoesModel.findAll();
    res.status(200).json(allRecords);
  } catch(e) {
    next(e);
  }
}

async function handleGetOne(req, res, next) {
  try { 
    const id = req.params.id;
    let record = await shoesModel.findOne({ where: { id } });
    res.status(200).json(record); 
  } catch(e) {
    next(e);
  }
}

async function handleCreate(req, res, next) {
  try {
    let data = req.body;
    let newRecord = await shoesModel.create(data);
    res.status(200).json(newRecord);
  } catch(e) {
    next(e);
  }
}

async function handleUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const newData = req.body;
    await shoesModel.update(newData, { where: { id } });
    let updatedRecord = await shoesModel.findOne({ where: { id } });
    res.status(200).json(updatedRecord);
  } catch(e) {
    next(e);   
  }
}

async function handleDelete(req, res, next) {
  try {
    const id = req.params.id;
    await shoesModel.destroy({ where: { id }});
    res.status(200).send('Item deleted');
  } catch(e) {
    next(e);
  }
}
    
module.exports = router;