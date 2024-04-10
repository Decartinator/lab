const cars  = require("../cars.json")   

module.exports = async function cars (context, req){
    context.log('Getting cars');
    context.res = {
        body: cars,
    }
}