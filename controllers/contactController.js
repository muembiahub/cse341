const mongodb = require('../config/database');
const objectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
        const contacts = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .find();
            contacts.toArray().then ((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contacts);
            });
};

//  
const getContactById = async (req, res) => {
    const contactId = new objectId(req.params.id);
        const contact = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .find({ _id: contactId });
            contact.toArray().then ((contact) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contact[0]);
            });
};

 



const addContact = (req, res) => {
    const newContact = req.body;
    
};

const deleteContact = (req, res) => {
    res.send('Delete contact');
};

const updateContact = (req, res) => {
    res.send('Update contact');
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact
};