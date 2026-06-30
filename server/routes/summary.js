const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getSummary } = require('../controllers/summaryController');

router.get('/', auth, getSummary);

module.exports = router;