const Contacts = require('../model');

//  function to get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts();
    return res.json({
      status: 'succes',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

//  function to get contact by ID
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

//  function to create a contact
const createContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

//  function to delete a contact by ID
const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

//  function to update a contact by ID
const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

//  function to get contact by ID whith favorite field
const updateStatusContact =
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateStatusContact(
        req.params.contactId,
        req.body,
      );
      console.log(typeof req.body);
      const isFavorite = Object.keys(req.body).some(el => el === 'favorite');
      console.log(isFavorite);
      if (!isFavorite) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          data: { message: 'missing field favorite' },
        });
      }
      if (contact) {
        return res.json({
          status: 'success',
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        });
      }
    } catch (e) {
      next(e);
    }
  };

module.exports = {
        getAllContacts,
        getContactById,
        createContact,
        removeContact,
        updateContact,
        updateStatusContact
 }