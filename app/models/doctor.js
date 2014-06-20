'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Doctor Schema
 */
var DoctorSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  speciality: {
    type: Number,
    default: ''
  },
  sub_speciality: {
    type: Number,
    default: ''
  }
});

/**
 * Statics
 */
// ArticleSchema.statics.load = function(id, cb) {
//   this.findOne({
//     _id: id
//   }).populate('user', 'name username').exec(cb);
// };

mongoose.model('Doctor', DoctorSchema);