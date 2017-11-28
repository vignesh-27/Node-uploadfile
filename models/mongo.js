var mongoose = require('mongoose');

//Create a schema-this is like a Blue print (like data types)
var todoSchema = new mongoose.Schema({
    sampleFile: { type: String, unique: true }
});

//Model Creation
module.exports = mongoose.model('Data', todoSchema);
