const express = require('express');

const { addcustomer, getAllCustomers, getcustomer } = require('../controllers/customerController');

const router = express.Router();

router.post('/customer', addcustomer);
router.get('/customer', getAllCustomers);
router.get('/customer/:id', getcustomer);

module.exports = {
    routes: router
}