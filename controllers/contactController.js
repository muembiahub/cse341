const mongodb = require('../config/database');
const objectId = require('mongodb').ObjectId;


const homePage = (req, res) => {
    res.status(200).send({message: 'Welcome to the contact API'});
}

const getAllContacts = async (req, res) => {
        const contact = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .find().toArray().then((contact) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contact);
                console.log(contact);
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
            console.log(contact[0]);
            });
};

 



const addContact = async (req, res) => {
     const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
      const response = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .insertOne(newContact);

        if (response.acknowledged) {
            res.status(201).json({
                message: 'Contact added successfully',
                id: response.insertedId
            });
        } else {
            res.status(500).json({
                message: 'Failed to add contact'
            });
    };
};

const deleteContact = async (req, res) => {

    const contactId = new objectId(req.params.id);
      const response = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .deleteOne({ _id: contactId });

        if (response.deletedCount > 0) {
            res.status(201).json({
                message: 'Contact deleted successfully',
                id: response.insertedId
            });
        } else {
            res.status(500).json({
                message: 'Failed to delete contact'
            });
    };
};
const updateContact =  async (req, res) => {
    const contactId = new objectId(req.params.id);
      const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
      const response = await mongodb
            .getdatabase()
            .db('cse341')
            .collection('contacts')
            .replaceOne({ _id: contactId }, newContact);

        if (response.modifiedCount > 0) {
            res.status(201).json({
                message: 'Contact modified successfully',
                id: response.insertedId
            });
        } else {
            res.status(500).json({
                message: 'Failed to modify contact'
            });
    };
};


module.exports = {
    homePage,
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact
};