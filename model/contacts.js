const Contacts = require('./schemas/contact');

// Function Get all contacts
const getAllContacts = async () => {
  return await Contacts.find();
};

// Function Get contact by Id
const getContactById = async contactId => {
  return await Contacts.findById(contactId);
};

// Function delete contacts
const removeContact = async contactId => {
  return await Contacts.findByIdAndRemove(contactId);
};

// Function create contact
const addContact = async body => {
  return await Contacts.create({
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  });
};

// Function update contact
const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

// Function update fild favorite in contact
const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
