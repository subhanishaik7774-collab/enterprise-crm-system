const express = require('express');
const { listActivities, createActivity } = require('../controllers/activityController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', listActivities);
router.post('/', createActivity);

module.exports = router;
