const fs = require('fs/promises');
const patch = require('path');
const shortid = require('shortid');

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

const addContact = async body => {
  const id = shortid();
  const newContact = {
    id: id,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  try {
    return await listContacts().then(contacts => {
      contacts.push(newContact);
      const data = JSON.stringify(contacts, 0, 2);
      return fs.writeFile(contactsPath, data, 'utf-8');
    });
  } catch (e) {
    return console.log(e);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
