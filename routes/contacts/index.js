const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const guard = require('../../helper/guard');

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validationContact');

//  Route all contacts
router.get('/', guard, ctrl.getAllContacts);

//  Route a contact by ID
router.get('/:contactId', guard, ctrl.getContactById);

//  Route create a contact
router.post('/', validationCreateContact, guard, ctrl.createContact);

//  Route delete a contact by ID
router.delete('/:contactId', guard, ctrl.removeContact);

//  Route update a contact by ID
router.patch('/:contactId', guard, validationUpdateContact, ctrl.updateContact);

//  Route contact by ID whith favorite field
router.patch(
  '/:contactId/favorite',
  guard,
  validationUpdateStatusContact,
  ctrl.updateStatusContact,
);

module.exports = router;
