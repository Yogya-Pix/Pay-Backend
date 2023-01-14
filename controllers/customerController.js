'use strict';

const db = require('../db');
const Customer = require('../models/Customerdata');
// const firestore = db.firestore();

const addcustomer = async(req,res,next) => {
    try{
        const data = req.body;
        const response = await db.collection('customerData').doc().set(data);
        res.send(response);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getcustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await db.collection('customerData').doc(id);
        const data = await customer.get();
        if(!data.exists) {
            res.status(404).send('Customer with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addcustomer,
    getcustomer
}