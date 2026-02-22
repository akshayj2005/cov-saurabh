const express=require('express');
const router=express.Router();

const {createContact,getContacts,deleteContact}=require('../controllers/contactController');
const isAdmin = require('../middleware/auth');
const VerifyToken = require('../middleware/auth');

router.post('/',createContact);
router.get('/',VerifyToken,getContacts);
router.delete('/:id',VerifyToken,deleteContact);

module.exports=router;