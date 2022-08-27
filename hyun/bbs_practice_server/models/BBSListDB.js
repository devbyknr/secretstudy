const mongoose = require('mongoose');

// Define Schemes
const BBSSchema = new mongoose.Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  content:{ type: String },
  date: { type: String },
  views: { type: Number }
},
{
  timestamps: true
});

const BBSCountSchema = new mongoose.Schema({
  _id : { type: Number },
  count : { type: Number},
});

BBSSchema.statics.findAll = function() {
    return this.find({});
}

// Create Model & Export
const BBSListDB = mongoose.model('BBSListDB', BBSSchema);
const BBSCount = mongoose.model('BBSCount',BBSCountSchema);
module.exports = {BBSListDB,BBSCount}