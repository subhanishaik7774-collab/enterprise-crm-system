const express = require('express');
const { dashboard } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/dashboard', dashboard);

module.exports = router;
