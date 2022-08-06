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

BBSSchema.statics.findAll = function() {
    return this.find({});
}

// Create Model & Export
const BBSListDB = mongoose.model('BBSListDB', BBSSchema);
module.exports = {BBSListDB}
