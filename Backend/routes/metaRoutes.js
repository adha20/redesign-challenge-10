const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

// GET /api/meta/ratings
router.get('/ratings', metaController.getRatings);

// GET /api/meta/classifications
router.get('/classifications', metaController.getClassifications);

module.exports = router;
