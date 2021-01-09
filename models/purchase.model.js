const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoSchema = new Schema({
    purchaseDate: { type: Date, default: Date.now },
    courseId: { type: mongoose.Schema.ObjectId, required: true },
    userId: { type: mongoose.Schema.ObjectId, required: true },

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
module.exports = mongoose.model('Purchase', mongoSchema);