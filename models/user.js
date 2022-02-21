//User model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let User = mongoose.Schema({
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    /*
    password:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'  
    }
    */
    email:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Email address is required'
    },
    displayName:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Display name is required'
    },
    created:
    {
        type: String,
        default: Date.now
    },
    update:
    {
        type: String,
        default: Date.now
    }
    

},
{
    collections: "user"
});

//configure options for our user model
let options = ({missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User',User);