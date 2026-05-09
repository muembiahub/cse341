const express = require('express');
const { client } = require('../db/connect');
const { ObjectId } = require('mongodb');

const router = express.Router();

// ✅ GET all contacts
router.get('/', async (req, res) => {
  try {
    const database = client.db('cse341');
    const contactsCollection = database.collection('contacts');

    const contacts = await contactsCollection.find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET single contact by ID
router.get('/contact', async (req, res) => {
  try {
    const contactId = req.query.id;

    if (!contactId) {
      return res.status(400).json({ message: "ID query parameter is required" });
    }

    const database = client.db('cse341');
    const contactsCollection = database.collection('contacts');

    const contact = await contactsCollection.findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("❌ Error fetching contact:", error);
    res.status(500).json({ message: "Invalid ID format or server error" });
  }
});

module.exports = router;
