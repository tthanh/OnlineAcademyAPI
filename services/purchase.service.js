const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Purchase = db.Purchase;

module.exports.getAll = async (query, select, offset, limit) => {
    return Purchase.find(query, select).limit(offset).skip(limit);
}

module.exports.create = async (purchaseParam) => {
    try{
        var purchase = new Purchase(purchaseParam);
        await purchase.save();

        return true;
    }
    catch(e){
        return false;
    }
    
}