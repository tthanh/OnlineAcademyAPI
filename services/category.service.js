const db = require('../helpers/mongo_db_connectivity');
var ObjectId = require('mongodb').ObjectId; 
const Category = db.Category;

module.exports.getAll = async (query, select, offset, limit) => {
    return Category.find(query, select).limit(offset).skip(limit);
}

module.exports.getById = async (categoryId,  query, select) => {
    return await Category.findOne({...query, "_id": ObjectId(categoryId)}, select);
}

module.exports.createSubcategory = async (categoryId, subcategory) => {
    console.log(categoryId);
    console.log(subcategory);
    try{
        const category = await this.getById(categoryId);
        if(!category){
            return false;
        }

        category.subCategories.push(subcategory);
        category.save();

        return true;
    }
    catch(e){
        return false;
    }
}

module.exports.deleteSubcategory = async (categoryId, subcategoryId) => {
    try{
        const category = await this.getById(categoryId);

        if(!category){
            return false;
        }

        category.subCategories.pull({"_id" : ObjectId(subcategoryId)});
        category.save();

        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

module.exports.delete = async (categoryId) => {
    try{
        const a = await Category.deleteOne({"_id": ObjectId(categoryId)});
        return true;
    }
    catch(e){
        return false;
    }
}

module.exports.create = async (categoryParam) => {
    try{
        await Category.create(categoryParam);

        return true;
    }
    catch (e){
        return false;
    }
}