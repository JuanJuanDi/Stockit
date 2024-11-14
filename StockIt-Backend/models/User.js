const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Método para encriptar la contraseña antes de guardarla
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

// Método para comparar contraseñas durante el login
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Método para generar JWT
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: '30d', // tiempo para expirar el token
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
