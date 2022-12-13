const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema({
  principle:{type:Number, require:true},
  rate:{type:Number, require:true},
  tenure:{type:Number, require:true},
  emi: {type:Number, require:true},
  interest: {type:Number, require:true},
  total:{type:Number, require:true},
});

const EMIModel = mongoose.model("emi", emiSchema);

module.exports = {
  EMIModel,
};
