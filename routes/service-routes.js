const express = require('express');

const { addprovider, getallprovider, getprovider } = require('../controllers/serviceController');

const router = express.Router();

router.post('/service', addprovider);
router.get('/service', getallprovider);
router.get('/service/:id', getprovider);

module.exports = {
    routes: router
}