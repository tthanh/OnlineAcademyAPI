const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Purchase = db.Purchase;

const courseService = require('../services/course.service');

module.exports.getByUser = async (query, select, offset, limit) => {
    try{
        const purchases = await Purchase.find(query, select).limit(offset).skip(limit);
        const purchasedCourses = await courseService.getByIds(purchases.map(x => x.courseId));

        var result = [];

        for(var i = 0; i < purchasedCourses.length;i++){
            var purchase = purchases.find(p => p.courseId == purchasedCourses[i]._id);
            
            result.push({...purchasedCourses[i],purchaseId : purchase._id,purchaseDate : purchase.purchaseDate});
        }

        return result;
        }   
    catch{

    }
    
}

module.exports.getByCourse = async (query, select, offset, limit) => {
    try{
        const purchases = await Purchase.find(query, select).limit(offset).skip(limit);
        return purchases;
    }
    catch{

    }
    
}

module.exports.create = async (purchaseParam) => {
    try{
        const checkPurchase = await Purchase.findOne(_.omit(purchaseParam,'purchaseDate'));
        if(checkPurchase){
            return false;
        }

        var purchase = new Purchase(purchaseParam);
        await purchase.save();
        return true;
    }
    catch(e){
        return false;
    }
    
}