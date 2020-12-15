const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessonSchema = require("./lesson.model").schema;

const mongoSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    samplePictures: [
        {
            pictureUrl: {type: String}
        }
    ],
    teacherId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    lastEdited: { type: Date, default: Date.now },
    price: { type: Number, default: Date.now },
    rating: { type: Number, default: Date.now },
    comments: [
        {
            userID: {type: String},
            commentHeader: {type: String},
            commentContent: {type: String},
            rating:{type: Number}
        }
    ],
    lessons: [ lessonSchema ],
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
module.exports = mongoose.model('Course', mongoSchema);