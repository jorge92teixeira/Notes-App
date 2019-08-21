const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Note = require('./note');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.pre('save', async function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.pre('remove', async function preRemove(next) {
  const user = this;
  await Note.deleteMany({ owner: user._id });
  next();
});

userSchema.set('toJSON', {
  getters: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model('User', userSchema);
