const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoSchema = new Schema({
    order: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String},
    videoUrl: { type: String },
    createdDate: { type: Date, default: Date.now },
    lastEdited: { type: Date, default: Date.now }
});

mongoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports.schema = mongoSchema;
module.exports = mongoose.model('Lesson', mongoSchema);