const Contacts = require('./schema/contacts');

// Function Get all contacts
const getAllContacts = async () => {
  const allContacts = await Contacts.find();
  return allContacts;
};

// Function Get contact by Id
const getContactById = async contactId => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

// Function delete contacts
const removeContact = async contactId => {
  const contact = Contacts.findByIdAndRemove(contactId);
  return contact;
};

// Function create contact
const addContact = async body => {
  const newContact = Contacts.create(body);
  return newContact;
};

// Function update contact
const updateContact = async (contactId, body) => {
  const contact = Contacts.findByIdAndUpdate(contactId, body, { new: true });
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
