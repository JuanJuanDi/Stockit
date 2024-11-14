const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({

  name:{
    typa: String,
    required: true,
  },

  address: {
    type: String,
    required:true,
  },

  phone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt:{
    type: Date,
    default: Date.now,
  },
});

const Provider = mongoose.model('Provider', ProviderSchema);

model.export = Porivder;