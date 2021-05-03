const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validationContact');

//  Route all contacts
router.get('/', ctrl.getAllContacts);

//  Route a contact by ID
router.get('/:contactId', ctrl.getContactById);

//  Route create a contact
router.post('/', validationCreateContact, ctrl.createContact);

//  Route delete a contact by ID
router.delete('/:contactId', ctrl.removeContact);

//  Route update a contact by ID
router.patch('/:contactId', validationUpdateContact, ctrl.updateContact);

//  Route contact by ID whith favorite field
router.patch(
  '/:contactId/favorite',
  validationUpdateStatusContact,
  ctrl.updateStatusContact,
);

module.exports = router;
