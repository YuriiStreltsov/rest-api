const Contacts = require('./schemas/contact');

// Function Get all contacts
const getAllContacts = async (userId, query) => {
  return await Contacts.find({ owner: userId });
};

// Function Get contact by Id
const getContactById = async (userId, contactId) => {
  return await Contacts.findById(contactId);
};

// Function delete contacts
const removeContact = async (userId, contactId) => {
  return await Contacts.findByIdAndRemove(contactId);
};

// Function create contact
const createContact = async (userId, body) => {
  return await Contacts.create({
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
    owner: userId,
  });
};

// Function update contact
const updateContact = async (userId, contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

// Function update fild favorite in contact
const updateStatusContact = async (userId, contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
};
