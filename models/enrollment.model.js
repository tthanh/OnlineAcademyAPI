const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoSchema = new Schema({
    enrollDate: { type: Date, default: Date.now },
    courseId: { type: String, required: true },
    userId: { type: String, required: true },

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
module.exports = mongoose.model('Enrollment', mongoSchema);