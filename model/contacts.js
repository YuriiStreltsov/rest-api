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

const removeContact = async contactId => {
  try {
    const deletedContact = await getContactById(contactId);
    const filtredContacts = await listContacts().then(contacts =>
      contacts.filter(contact => String(contact.id) !== contactId),
    );
    const data = JSON.stringify(filtredContacts, 0, 2);
    fs.writeFile(contactsPath, data, 'utf-8');
    return deletedContact;
  } catch (e) {
    return error.message;
  }
};

const addContact = async body => {
  const id = shortid();
  const newContact = {
    id: id,
    ...body,
  };
  try {
    return await listContacts().then(contacts => {
      console.log(contacts);
      contacts.push(newContact);
      const data = JSON.stringify(contacts, 0, 2);
      fs.writeFile(contactsPath, data, 'utf-8');
      return newContact;
    });
  } catch (e) {
    return console.log(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
  } catch (e) {
    return console.log(e);
  }
};

// const contactOld = await getContactById(contactId);
// const contactNew = { ...contactOld, ...body };
// const allContacts = await listContacts();
// const record = [...allContacts, ...contactNew];
// console.log(record);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
