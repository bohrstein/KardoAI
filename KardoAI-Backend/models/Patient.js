const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: Number,
    required: true,
  },
  basel_creatin: {
    type: Number,
    required: true,
  },
  contrast_volume_ml: {
    type: Number,
    required: true,
  },
  diabet: {
    type: Number,
    required: true,
  },
  hemo: {
    type: Number,
    required: true,
  },
  iabp_used: {
    type: Number,
    required: true,
  },
  cin_outcome: {
    type: Number,
    required: true,
  },
  cinValue: {
    type: Number,
    required: false,
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
