const express = require('express');
const { client } = require('../db/connect');
const { ObjectId } = require('mongodb');
const  {  contactsCollection, database } = require ('../db/connect');


const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsCollection.find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(400).json({ message: "ID query parameter is required" });
    }
   const contact = await contactsCollection.findOne({ _id: new ObjectId(contactId)});

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
    console.log(`✅ Contact with ID ${contactId} retrieved successfully`);
  } catch (error) {
    console.error("❌ Error fetching contact:", error);
    res.status(500).json({ message: "Invalid ID format or server error" });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };
    const result = await contactsCollection.insertOne(newContact);

    res.status(201).json({ message: "Contact created successfully", contactId: result.insertedId });
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!contactId) {
      return res.status(400).json({ message: "ID query parameter is required" });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await contactsCollection.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    console.error("❌ Error updating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!contactId) {
      return res.status(400).json({ message: "ID query parameter is required" });
    }

    const result = await contactsCollection.deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };