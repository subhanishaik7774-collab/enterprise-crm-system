const express = require('express');
const { listCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', listCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
