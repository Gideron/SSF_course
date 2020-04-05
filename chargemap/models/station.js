// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title:  String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {
      type: [Number], //[longitude, latitude]
      required: true,
    }
  },
  Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}]
});

module.exports = mongoose.model('Station', stationSchema);
