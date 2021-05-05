const Contacts = require('../model/contacts');
const { HttpCode } = require('../helper/constants');

//  function to get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contacts = await Contacts.getAllContacts(userId, req.query);
    return res.json({
      status: 'succes',
      code: HttpCode.OK,
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
    const userId = req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

//  function to create a contact
const createContact = async (req, res, next) => {
  const userId = req.user?.id;
  const queryName = req.body.name;
  console.log(queryName);
  const oldContact = await (await Contacts.getAllContacts(userId)).find(
    ({ name }) => name === queryName,
  );
  console.log(oldContact);
  if (oldContact) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'This Name in use',
    });
  }
  try {
    const contact = await Contacts.createContact(userId, req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
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
    const userId = req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
    const userId = req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

//  function to get contact by ID whith favorite field
const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body,
    );
    console.log(typeof req.body);
    const isFavorite = Object.keys(req.body).some(el => el === 'favorite');
    console.log(isFavorite);
    if (!isFavorite) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        data: { message: 'missing field favorite' },
      });
    }
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
  updateStatusContact,
};
