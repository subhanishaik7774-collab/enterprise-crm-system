const express = require('express');
const { listLeads, createLead, updateLead, deleteLead } = require('../controllers/leadController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', listLeads);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
