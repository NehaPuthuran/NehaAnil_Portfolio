let mongoose = require("mongoose");

//create a model class
let businessContactsModel = mongoose.Schema({
    contactName: String,
    contactNumber: Number,
    email: String
},
{
    collection: "businessContacts"
});

module.exports = mongoose.model('BusinessContacts', businessContactsModel);