const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessonSchema = require("./course/lesson.model").schema;
const feedbackSchema = require("./course/feedback.model").schema;
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
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    feedback: [ feedbackSchema ],
    lessons: [ lessonSchema ],
    categoryId: { type: String, required: true },
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