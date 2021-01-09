const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    birthDate: { type: Date, default: Date.now },
    roleId: {type: Number, required: true},
    verified: {type: Boolean,default: false},
    watchList: [{type: String,require: true, unique: true}]
});

mongoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', mongoSchema);