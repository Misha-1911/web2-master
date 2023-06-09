const { Schema, model, Types } = require('mongoose');

const linkSchema = new Schema({
  // userId: { type: Types.ObjectId, required: true },
  link: {
    original: { type: String, required: true },
    cut: { type: String, required: true, unique: true }
  },
  expiredAt: { type: Date, required: true }
});

const Link = new model('links', linkSchema, 'links');

module.exports = { Link };