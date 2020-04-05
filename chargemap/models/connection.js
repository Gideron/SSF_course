const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    Quantity: Number,
      ConnectionType: {
          Id: String,
          FormalName: String,
          Title: String
      },
      CurrentType: {
          Id: String,
          Description: String,
          Title: String
      },
      LevelType: {
          Id: String,
          Title: String,
          Comments: String,
          IsFastChargeCapable: Boolean
      }
});

module.exports = mongoose.model('Connection', connectionSchema);
