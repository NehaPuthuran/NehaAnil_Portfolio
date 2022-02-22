let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//connect to our Business Contacts Model
let BusinessContacts = require('../models/businessContacts');

//GET route for business contacts list page - READ operation
router.get('/',requireAuth, (req, res, next) => {
    BusinessContacts.find((err, businessContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(businessContactList);
            res.render('businessContacts', {
                title: 'Business Contacts', 
                BusinessContactList: businessContactList,
            displayName : req.user ? req.user.displayName : ''})
        }
    });
});

//GET route to update business contacts list page - UPDATE operation
router.get('/update/:id',requireAuth, (req, res, next) => {
    let id = req.params.id

    BusinessContacts.findById(id, (err, businessContactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('update', {
                title: 'Update Business Contact', 
                businessContacts: businessContactToEdit,
                displayName : req.user ? req.user.displayName : ''})
        }
    });
});
//POST route to process the updation in business contacts list page - UPDATE operation
router.post('/update/:id', requireAuth, (req, res, next) => {
    let id = req.params.id
    let updatedBusinessContact = BusinessContacts({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });
    BusinessContacts.updateOne({_id: id}, updatedBusinessContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/businessContactList');
        }
    })
});

//GET route to perform deletion - DELETE operation
router.get('/remove/:id', requireAuth, (req, res, next) => {
    let id = req.params.id

    BusinessContacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/businessContactList')
        }
    })
});


module.exports = router;