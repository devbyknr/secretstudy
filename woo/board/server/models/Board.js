const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const boardSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
  },
});
boardSchema.plugin(AutoIncrement, { inc_field: "id" });

boardSchema.statics.findAll = function () {
  return this.find({});
};

boardSchema.statics.findOneByTodoid = function (id) {
  return this.findOne({ id });
};

boardSchema.statics.updateByTodoid = function (id, content) {
  return this.findOneAndUpdate({ id }, content, { new: true });
};

boardSchema.statics.deleteByTodoid = function (id) {
  return this.remove({ id });
};

const Board = mongoose.model("Board", boardSchema);
module.exports = { Board };
