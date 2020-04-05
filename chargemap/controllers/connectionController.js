'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
    const connections = await connectionModel.find().populate('Connections');
    res.json(connections);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
  
  //res.send('With this endpoint you can get connections');
};

const connection_get = async (req, res) => {
  try {
    const connections = await connectionModel.findById(req.params.id);
    res.json(connections);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
  //res.send('With this endpoint you can get one connection');
};

const connection_post = (req, res) => {
  res.send('With this endpoint you can add connections');
};

module.exports = {
    connection_list_get,
    connection_get,
    connection_post,
};
