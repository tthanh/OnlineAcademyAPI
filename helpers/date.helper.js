module.exports.isValidDate = function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}