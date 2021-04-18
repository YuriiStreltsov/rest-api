const fs = require('fs/promises');
const patch = require('path');
const shortid = require('shortid');

const contactsPath = patch.join(__dirname, 'contacts.json');

// Function Get all contacts
const listContacts = async () => {
  try {
    return await fs
      .readFile(contactsPath, 'utf8')
      .then(data => JSON.parse(data));
  } catch (error) {
    return error.message;
  }
};

// Function Get contact by Id
const getContactById = async contactId => {
  try {
    return await listContacts().then(contacts =>
      contacts.find(contact => String(contact.id) === contactId),
    );
  } catch (e) {
    return error.message;
  }
};

// Function delete contacts
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

// Function create contact
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

// Function update contact
const updateContact = async (contactId, body) => {
  try {
    const allContact = await listContacts();
    const contact = await getContactById(contactId);
    const newContact = { ...contact, ...body };
    const record = allContact.map(contact => {
      if (contact.id !== contactId) {
        return contact;
      }
      return (contact = { ...newContact });
    });

    const data = JSON.stringify(record, 0, 2);
    console.log(record);
    fs.writeFile(contactsPath, data, 'utf-8');
    return newContact;
  } catch (e) {
    return console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
