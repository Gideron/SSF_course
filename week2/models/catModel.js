'use strict';
//const pool = require('../database/db');
//const promisePool = pool.promise();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name:  String,
  age: {type: Number, min: 0, default: 0},
  gender: ['male', 'female'],
  color: String,
  weight: Number
});


const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

async function getCat(cat_id) {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ' + cat_id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat,
};
