'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() =>{
    const res = await Product.find({active:true},'title price slug'); 
    return res;   
};


exports.getBySlug = async(slug) =>{
    const res = await Product.findOne({
        slug: slug,
        active:true},'title description price slug tags'); 
    return res;   
};