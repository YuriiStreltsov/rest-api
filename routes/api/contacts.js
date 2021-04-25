const express = require('express');
const router = express.Router();
const Contacts = require('../../model/contacts');
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validationContact');

//Route to get all contacts
router.get('/', async (req, res, next) => {
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
});

//Route to get contact by ID
router.get('/:contactId', async (req, res, next) => {
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
});

//Route to create a contact
router.post('/', validationCreateContact, async (req, res, next) => {
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
});

//Route to delete a contact by ID
router.delete('/:contactId', async (req, res, next) => {
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
});

//Route to update a contact by ID
router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
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
});

//Route to get contact by ID whith favorite field
router.patch(
  '/:contactId/favorite',
  validationUpdateStatusContact,
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
  },
);

module.exports = router;
