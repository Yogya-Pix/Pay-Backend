'use strict';
const express = require('express');
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);

})