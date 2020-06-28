'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/product-repository');


exports.get = async(req, res, next) =>{

    try {
        let data = await repository.get(); 
        res.status(200).send(data);
        console.log('Found');
    } catch (error) {
        res.status(500).send({message: 'Falha ao Processar Requisição'});
    }
       
};


exports.getBySlug = async(req, res, next) =>{
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: 'Not Found'});
    }  
};


exports.getById =(req, res, next) =>{
    Product.findById(req.params.id
        ,'title description price slug tags').then(data=>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send({message: 'Not Found', data: e});
    });
};


exports.getByTag =(req, res, next) =>{
    Product.find({
        tags: req.params.tag,
        active:true},'title description price slug tags').then(data=>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send({message: 'Not Found', data: e});
    });
};

exports.post = (req, res, next) => {
    var product = new Product();
    //never forget req.body.something
    product.title = req.body.title;
    console.log(req.body.title)
    product.slug = req.body.slug;
    console.log(req.body.slug)
    product.status = req.body.status;
    product.price = req.body.price;
    product.description=req.body.description;
    product.active = req.body.active;
    product.tags = req.body.tags;

    product.save().then(x=>{
        res.status(201).send({message: 'Produto Cadastrado com sucesso!'});
    }).catch(e=>{
        res.status(400).send({message: 'Falha ao Cadastrar produto', data: e});
    });
    
};

exports.put = (req,res,next) =>{

    Product.findByIdAndUpdate(req.params.id,{
        $set:{
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto Atualizado com Sucesso!'
        });
    }).catch(e =>{
        res.status(400).send({message: 'Falha ao atualizar o  produto', data : e});
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id).then(x => {
        res.status(200).send({
            message: 'Produto Removido com Sucesso!'
        });
    }).catch(e =>{
        res.status(400).send({message: 'Falha ao Remover o  produto', data : e});
    });
};