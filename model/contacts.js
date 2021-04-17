const fs = require('fs/promises');
const patch = require('path');
// const contacts = require('./contacts.json');

const contactsPath = patch.join(__dirname, 'contacts.json');

const listContacts = async () => {
  return await fs
    .readFile(contactsPath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => console.log(err.message));
};

const getContactById = async contactId => {};

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
