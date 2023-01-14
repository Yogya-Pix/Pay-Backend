'use strict';

const db = require('../db');
const Service = require('../models/serviceprovider');

const addprovider = async(req,res,next) => {
    try{
        const data = req.body;
        const response = await db.collection('ServiceProviderData').doc().set(data);
        res.send(response);
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getprovider = async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await db.collection('ServiceProviderData').doc(id);
        const data = await customer.get();
        if(!data.exists) {
            res.status(404).send('Provider with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addprovider,
    getprovider
}