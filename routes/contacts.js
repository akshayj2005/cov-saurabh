const express=require('express');
const router=express.Router();

const {createContact,getContacts,deleteContact}=require('../controllers/contactController');
const isAdmin = require('../middleware/auth');
const VerifyToken = require('../middleware/auth');
const authorizeRole = require('../middleware/role');
const {contactValidationRules,validate}=require('../validators/contactValidator');

router.post('/',contactValidationRules(),validate,createContact);
router.get('/',VerifyToken,authorizeRole("admin"),getContacts);
router.delete('/:id',VerifyToken,authorizeRole("admin"),deleteContact);

module.exports=router;