const express = require('express');
const { client } = require('../db/connect');
const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const  { getAllContacts, getContactById, createContact, updateContact, deleteContact} = require ('../controllers/contact');

 
const router = express.Router();



//  Validation middleware

const validationFields = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("favoriteColor").notEmpty().withMessage("Favorite color is required"),
  body("birthday").notEmpty().withMessage("Birthday is required"),
];



//  
router.use('/', require('./swagger'));
// ✅ GET all contacts
router.get('/', getAllContacts);

// ✅ GET single contact by ID
router.get('/:id', getContactById);

//  create a new contact
router.post('/create', validationFields, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createContact(req, res);
  });

//  update contact by ID
router.put('/update/:id', validationFields, (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}
    updateContact(req, res);
});
//  delete contact by ID
router.delete('/delete/:id', deleteContact);

module.exports = router;
