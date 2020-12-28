const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoSchema = new Schema({
    categoryName: { type: String, unique: true, required: true },
    subCategories: [
        {
            categoryName: {type: String}
        }
    ]
});

mongoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Category', mongoSchema);