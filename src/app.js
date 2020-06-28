const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//connectando com o Banco
mongoose.connect('mongodb://localhost:27017/nodestr',{useNewUrlParser: true, useUnifiedTopology: true});
const Product = require('./models/product');


//Carrega as rotas
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extend:true}));
//Since express 4.16.0
app.use(express.urlencoded({ extended: true }))



app.use('/',indexRoutes);
app.use('/products',productRoutes);


module.exports = app;