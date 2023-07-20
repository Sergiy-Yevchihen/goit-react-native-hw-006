const path = require("path");
const fs = require("fs").promises;
const ObjectId = require("bson-objectid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = await contacts.find((contact) => contact.id === contactId);
    if (!result) return null;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: ObjectId() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
