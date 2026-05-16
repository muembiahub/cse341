const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/contact', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContactById);
router.post('/contact/add', contactController.addContact);
router.delete('/coontact/delete/:id', contactController.deleteContact);
router.put('/update/:id', contactController.updateContact);


module.exports = router;