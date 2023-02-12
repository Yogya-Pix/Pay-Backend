'use strict';
const express = require('express');
const stripe = require('stripe')('<write you stripe secret key here');
const cors = require('cors');
const bodyParser = require('body-parser');
const costomerRoutes = require('./routes/customer-routes.js');
const serviceRoutes = require('./routes/service-routes.js');
const authRouter = require('./routes/auth-router.js');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));

app.use('/api', costomerRoutes.routes);
app.use('/api', serviceRoutes.routes);
app.use('/api', authRouter.routes);

app.post('/api/payment-sheet', async (req, res) => {
    const {amount, currency } = req.body

    const customer = await stripe.customer.create();
    const ephemeralkey = await stripe.ephemeralkey.create(
        {customer: customer.id},
        {apiVersion: '2023-02-12'}
    );
    const paymentIntent = await stripe.paymentIntent.create({
        amount: amount,
        currency: currency,
        customer: customer.id,
        payment_method_types: ['card'],
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralkey: ephemeralkey.secret,
        customer: customer.id,
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);

})