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

const getallprovider = async (req, res, next) => {
    try {
        const provider = await db.collection('ServiceProviderData');
        const data = await provider.get();
        const providerArray = [];
        if(data.empty) {
            res.status(404).send('No provider record found');
        }else {
            data.forEach(doc => {
                const provid = new Service(
                    doc.id,
                    doc.data().id,
                    doc.data().providerName,
                    doc.data().type,
                    doc.data().Service,
                    doc.data().amount,
                    doc.data().status
                );
                providerArray.push(provid);
            });
            res.send(providerArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getprovider = async (req, res, next) => {
    try {
        const id = req.params.id;
        const service = await db.collection('ServiceProviderData').doc(id);
        const data = await service.get();
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
    getallprovider,
    getprovider
}