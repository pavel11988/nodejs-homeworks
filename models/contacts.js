const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const newID = require("bson-objectid");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (removeIndex === -1) {
    return null;
  }
  const removeContact = contacts.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: newID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();

  const updateIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (updateIndex === -1) {
    return null;
  } else {
    contacts[updateIndex] = {
      id: contactId,
      name,
      email,
      phone,
    };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
