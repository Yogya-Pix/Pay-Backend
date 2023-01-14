'use strict';
const db = require('../db');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { firestore } = require('firebase-admin');

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = {
            useName: req.body.useName,
            email: req.body.email,
            password: hash,
        }

        await db.collection('authDetail').doc().set(newUser);
        res.status(200).send("User has been created.")
    } catch (error) {
        // res.status(400).send(error.message);
        next(error)
    }
}

// const login = async (req, res, next) => {
//     try {
//         const users = await db.collection('authdetails');
//         const data = await users.get();
//         const docRef = doc(db, "useName:req.body.userName");
//         const docSnap = await getDoc(docRef);
//         docSnap.data()
//         if(!docSnap) return res.status(404).send("Not Found");
//         return res.status(200).send("Found");
//     }catch(error){
//         next(error);
//     }
// }

module.exports = {
    register
}