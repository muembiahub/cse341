const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const { contactValidationRules, checkValidationResult } = require('../middleware/validator');

router.get('/', contactController.homePage);
router.get('/contact', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContactById);
router.post('/contact/add',contactValidationRules(), checkValidationResult,  contactController.addContact);
router.delete('/contact/delete/:id', contactController.deleteContact);
router.put('/contact/update/:id',contactValidationRules(), checkValidationResult, contactController.updateContact);


module.exports = router;