const express = require('express');

const { addcustomer,getcustomer } = require('../controllers/customerController');

const router = express.Router();

router.post('/customer', addcustomer);
router.get('/customer/:id', getcustomer);

module.exports = {
    routes: router
}