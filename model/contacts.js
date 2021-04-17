const fs = require('fs/promises');
const patch = require('path');
// const contacts = require('./contacts.json');

const contactsPath = patch.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    return await fs
      .readFile(contactsPath, 'utf8')
      .then(data => JSON.parse(data));
  } catch (error) {
    return error.message;
  }
};

const getContactById = async contactId => {
  try {
    return await listContacts().then(contacts =>
      contacts.find(contact => String(contact.id) === contactId),
    );
  } catch (e) {
    return error.message;
  }
};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
